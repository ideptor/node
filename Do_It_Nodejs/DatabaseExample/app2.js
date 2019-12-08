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

var addUser = (database, id, password, name, callback) => {
    console.log("addUser called.");

    var users = database.collection('users');
    users.insert([{
        "id": id,
        "password": password,
        "name": name,
    }], (err, result)=>{
        if(err) {
            callback(err, null);
            return;
        }

        console.log("User info added.");
        callback(null, result);
    });
};
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

app.post('/process/adduser', (req, res)=>{
    console.log('/process/adduser called');

    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;

    if(database) {
        addUser(database, paramId, paramPassword, paramName, (err, result)=>{
            if(err) { throw err;}

            if(result) {
                console.dir(result);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>Add user success</h2>');
                res.end();
            } else {
                res.writeHead('200', {'Content-type':'text/html;charset=utf8'});
                res.write('<h2>Add user failed</h2>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>Fail to connect database</h2>');
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
PS C:\gitworkplace\node\Do_It_Nodejs\DatabaseExample> node .\app2.js
Server is started at port:3000
(node:7648) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Database connection complete. : mongodb://localhost:27017/shopping
/process/adduser called
addUser called.
(node:7648) DeprecationWarning: collection.insert is deprecated. Use insertOne, insertMany or bulkWrite instead.

User info added.
{
  result: { ok: 1, n: 1 },
  ops: [ { id: 't1', password: '123', name: 'david', _id: [ObjectID] } ],
  insertedCount: 1,
  insertedIds: {
    '0': ObjectID { _bsontype: 'ObjectID', id: [Buffer [Uint8Array]] }
  }
}
/process/login called
authUser called.
Success to find user with id:[t1], pwd:[123]
[
  {
    _id: ObjectID { _bsontype: 'ObjectID', id: [Buffer [Uint8Array]] },
    id: 't1',
    password: '123',
    name: 'david'
  }
]
*/
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

localhost:3000/public/adduser.html
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