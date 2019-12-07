var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');

var app = express();

// database
var mongodb = require('mongodb');

var database;

function connectDB() {
    var databaseUrl = 'mongodb://localhost:27017/shopping';

    mongodb.connect(databaseUrl, (err,db) => {
        if(err) throw err;

        console.log('Database connection complete. : %s', databaseUrl)
        database = db.db('shopping');
        
    });
}


var authUser = (database, id, password, callback) => {
    console.log('authUser called.');

    //console.dir(database);

    var users = database.collection('users');
    users.find({'id':id, 'password':password}).toArray((err, docs)=>{
        if(err) {
            callback(err, null);
            return;
        }

        if(docs.length > 0) {
            console.log('Success to find user with id:[%s], pwd:[%s]', id, password);
            callback(null, docs);
        } else{
            console.log('Fail to find user.');
            callback(null, null);
        }
    });
}
// server variable setting & public folder for static

app.set('port', process.env.PORT || 3000);
app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));

// 

app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized:true
}));


var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});


app.post('/process/login', (req, res) => {
    console.log("/process/login called");

    var paramId = req.body.id;
    var paramPassword = req.body.password;

    if(database) {
        authUser(database, paramId, paramPassword, (err, docs)=>{
            if(err) throw err;

            if(docs) {
                console.dir(docs);

                res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
                res.write('<h1> Login Success </h1>');
                res.write('<div><p>id : '+paramId+'</p></div>');
                res.write('<div><p>name : '+docs[0].name+' </p></div>');
                res.write('<br><br><a href="/public/login.html">Login again</a>');
                res.end();
            } else {

                res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
                res.write('<h1> Login Failed </h1>');
                res.write('<div><p> Invalid id and password. </p></div>');
                res.write('<br><br><a href="/public/login.html">Login again</a>');
                res.end();                
            }
        });
    } else {
        
        res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
        res.write('<h2> Database connection fail </h2>');
        res.write('<div><p> Cannot connect database. </p></div>');
        res.end();
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), () => {
    console.log('Server is started at port:%d', app.get('port'));

    connectDB();
});

/*

mongodb:
mongod --dbpath C:\workspace\mongo\shopping\database

```
MongoDB Enterprise > db.users.insert({"id":"test01", "name":"girl", "password":"123456"})
WriteResult({ "nInserted" : 1 })
MongoDB Enterprise > db.users.find().pretty()
{
        "_id" : ObjectId("5debb932d5fc28048f95cc72"),
        "id" : "test01",
        "name" : "girl",
        "password" : "123456"
}
```

localhost:3000/public/login.html
*/

//console.dir(database);
        /*
        MongoClient {
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  s: {
    url: 'mongodb://localhost:27017/shopping',
    options: {
      servers: [Array],
      caseTranslate: true,
      dbName: 'shopping',
      socketTimeoutMS: 360000,
      connectTimeoutMS: 30000,
      retryWrites: true,
      useRecoveryToken: true,
      readPreference: [ReadPreference],
      promiseLibrary: [Function: Promise]
    },
    promiseLibrary: [Function: Promise],
    dbCache: Map {},
    sessions: Set {},
    writeConcern: undefined,
    namespace: MongoDBNamespace { db: 'admin', collection: undefined }
  },
  topology: Server {
    _events: [Object: null prototype] {
      serverOpening: [Function],
      serverDescriptionChanged: [Function],
      serverHeartbeatStarted: [Function],
      serverHeartbeatSucceeded: [Function],
      serverHeartbeatFailed: [Function],
      serverClosed: [Function],
      topologyOpening: [Function],
      topologyClosed: [Function],
      topologyDescriptionChanged: [Function],
      commandStarted: [Function],
      commandSucceeded: [Function],
      commandFailed: [Function],
      joined: [Function],
      left: [Function],
      ping: [Function],
      ha: [Function],
      authenticated: [Function],
      error: [Function],
      timeout: [Function],
      close: [Function],
      parseError: [Function],
      open: [Function],
      fullsetup: [Function],
      all: [Function],
      reconnect: [Function]
    },
    _eventsCount: 25,
    _maxListeners: Infinity,
    clientInfo: {
      driver: [Object],
      os: [Object],
      platform: 'Node.js v12.13.0, LE'
    },
    s: {
      coreTopology: [Server],
      sCapabilities: null,
      clonedOptions: [Object],
      reconnect: true,
      emitError: true,
      poolSize: 5,
      storeOptions: [Object],
      store: [Store],
      host: 'localhost',
      port: 27017,
      options: [Object],
      sessionPool: [ServerSessionPool],
      sessions: Set {},
      promiseLibrary: [Function: Promise]
    }
  }
}
*/