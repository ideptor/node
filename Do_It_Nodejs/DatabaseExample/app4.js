var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

var app = express();

var database;
var UserSchema;
var UserModel;

function connectDB() {
    var databaseUrl = 'mongodb://localhost:27017/shopping';

    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error'));
    database.on('open', () => {
        console.log('Database connection established.');

        UserSchema = mongoose.Schema({
            id: {type:String, required:true, unique:true},
            password: {type:String, required:true},
            name: {type:String, required: true},
            age: {type:Number, 'default': -1},
            created_at: {type:Date, index:{unique:false}, 'default':Date.now},
            updated_at: {type:Date, index:{unique:false}, 'default':Date.now}
        });

        //UserSchema.static('findById', function (id, callback) {
        UserSchema.statics.findById = function (id, callback) {
            return this.find({id:id}, callback);
        };
        UserSchema.static('findAll', function (callback) {
            return this.find({}, callback);
        });
        console.log('User scheme defined');
        
        UserModel = mongoose.model("users2", UserSchema);
        console.log("Users are defined");
    });

    database.on('disconnected', connectDB);
}


var authUser = (database, id, password, callback) => {
    console.log('authUser called.');

    //console.dir(database);

    UserModel.findById(id, (err, results)=> {
        if(err) {
            callback(err, null);
            return;
        }

        console.log('Success to find user with id:[%s]', id);
        console.dir(results);
        
        if(results.length>0){
            console.log('Success to find user: ', id);

            if(results[0]._doc.password === password) {
                console.log('Password is identical.');
                callback(null, results);
            } else {
                console.log('Password is not identical.');
                callback(null, results);
            }

        } else{
            console.log('Fail to find user.');
            callback(null, null);
        }
    });
}

var addUser = (database, id, password, name, callback) => {
    console.log("addUser called.");

    var user = new UserModel({'id':id, 'password':password, 'name':name});

    user.save((err)=>{
        if(err) {
            callback(err, null);
            return;
        }
        console.log("User info added.");
        callback(null, user);
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

app.post('/process/listuser', (req,res)=>{

    console.log('/process/listuser called.');
    
    if(database) {
        UserModel.findAll((err, results)=>{
            if(err) {
                callback(err, null);
                return;
            }

            if(results) {
                console.dir(results);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
                res.write('<h2>User list</h2>');
                res.write('<div><ul>');

                for(var i=0; i<results.length; i++){
                    var curId = results[i]._doc.id;
                    var curName = results[i]._doc.name;
                    res.write('   <li>#'+i+':'+curId+','+curName+'</li>');
                }

                res.write('</ul></div>');
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
                res.write('<h2>Fail to retrieve user list');
                res.end();
            }

        });
    }
    
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), () => {
    console.log('Server is started at port:%d', app.get('port'));

    connectDB();
});

/*
localhost:3000/public/adduser.html
localhost:3000/public/login.html

PS C:\gitworkplace\node\Do_It_Nodejs\DatabaseExample> node .\app3.js
Server is started at port:3000
(node:9848) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option 
{ useNewUrlParser: true } to MongoClient.connect.
(node:9848) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Database connection established.
User scheme defined
Users are defined
(node:9848) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
/process/adduser called
addUser called.
User info added.
model {
  '$__': InternalCache {
    strictMode: true,
    selected: undefined,
    shardval: undefined,
    saveError: undefined,
    validationError: undefined,
    adhocPaths: undefined,
    removing: undefined,
    inserting: true,
    saving: undefined,
    version: undefined,
    getters: {},
    _id: ObjectID { _bsontype: 'ObjectID', id: [Buffer [Uint8Array]] },
    populate: undefined,
    populated: undefined,
    wasPopulated: false,
    scope: undefined,
    activePaths: StateMachine {
      paths: [Object],
      states: [Object],
      stateNames: [Array],
      map: [Function]
    },
    pathsToScopes: {},
    cachedRequired: {},
    session: null,
    '$setCalled': Set { 'id', 'password', 'name' },
    ownerDocument: undefined,
    fullPath: undefined,
    emitter: EventEmitter {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: 0
    },
    '$options': {}
  },
  isNew: false,
  errors: undefined,
  _doc: {
    _id: ObjectID { _bsontype: 'ObjectID', id: [Buffer [Uint8Array]] },
    id: 'test04',
    password: '123456',
    name: 'Tiara',
    __v: 0
  },
  '$locals': {}
}
/process/login called
authUser called.
Success to find user with id:[test04], pwd:[123456]
[
  model {
    '$__': InternalCache {
      strictMode: true,
      selected: {},
      shardval: undefined,
      saveError: undefined,
      validationError: undefined,
      adhocPaths: undefined,
      removing: undefined,
      inserting: undefined,
      saving: undefined,
      version: undefined,
      getters: {},
      _id: [ObjectID],
      populate: undefined,
      populated: undefined,
      wasPopulated: false,
      scope: undefined,
      activePaths: [StateMachine],
      pathsToScopes: {},
      cachedRequired: {},
      session: null,
      '$setCalled': Set {},
      ownerDocument: undefined,
      fullPath: undefined,
      emitter: [EventEmitter],
      '$options': [Object]
    },
    isNew: false,
    errors: undefined,
    _doc: {
      _id: [ObjectID],
      id: 'test04',
      password: '123456',
      name: 'Tiara',
      __v: 0
    },
    '$locals': {},
    '$init': true
  }
]
Success to find user:  test04 123456
[
  model {
    '$__': InternalCache {
      strictMode: true,
      selected: {},
      shardval: undefined,
      saveError: undefined,
      validationError: undefined,
      adhocPaths: undefined,
      removing: undefined,
      inserting: undefined,
      saving: undefined,
      version: undefined,
      getters: {},
      _id: [ObjectID],
      populate: undefined,
      populated: undefined,
      wasPopulated: false,
      scope: undefined,
      activePaths: [StateMachine],
      pathsToScopes: {},
      cachedRequired: {},
      session: null,
      '$setCalled': Set {},
      ownerDocument: undefined,
      fullPath: undefined,
      emitter: [EventEmitter],
      '$options': [Object]
    },
    isNew: false,
    errors: undefined,
    _doc: {
      _id: [ObjectID],
      id: 'test04',
      password: '123456',
      name: 'Tiara',
      __v: 0
    },
    '$locals': {},
    '$init': true
  }
]
/process/login called
authUser called.
Success to find user with id:[test03], pwd:[123456]
[]
Fail to find user.
*/