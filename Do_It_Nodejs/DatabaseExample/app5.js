var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
var mongoose = require('mongoose');
var crypto = require('crypto');

const databaseUrl = 'mongodb://localhost:27017/shopping';

var app = express();

var database;
var UserSchema;
var UserModel;

function connectDB() {

    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error'));
    database.on('open', () => {
        console.log('Database connection established.');
        createUserSchema();
    });

    database.on('disconnected', connectDB);
}

function createUserSchema() {
    UserSchema = mongoose.Schema({
        id: {type:String, required:true, unique:true},
        hashed_password: {type:String, required:true, 'default':' '},
        salt: {type:String, required: true},
        name: {type:String, index: 'hased', 'default': ' '},
        age: {type:Number, 'default': -1},
        created_at: {type:Date, index:{unique:false}, 'default':Date.now},
        updated_at: {type:Date, index:{unique:false}, 'default':Date.now}
    });

    UserSchema.virtual('password').set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
        console.log('virtual password called : '+this.hashed_password);
    }).get(function() {return this._password});

    UserSchema.method('encryptPassword', function(plainText, inSalt) {
        if(inSalt) {
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
        } else {
            return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
        }
    });

    UserSchema.method('makeSalt', function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    })

    UserSchema.method('authenticate', function(plainText, inSalt, hashed_password) {
        if(inSalt) {
            console.log('authenticate called : %s -> %s : %s', plainText,
                        this.encryptPassword(plainText, inSalt), hashed_password);
            return this.encryptPassword(plainText, inSalt) === hashed_password;
        } else {
            console.log('authenticate called : %s -> %s : %s', plainText,
                        this.encryptPassword(plainText), hashed_password);
            return this.encryptPassword(plainText) === hashed_password;
        }
    });
    
    UserSchema.path('id').validate(function(id) {
        return id.length;
    }, 'id is absent.');

    UserSchema.path('name').validate(function(name) {
        return name.length;
    }, 'name is absent.')

    //UserSchema.static('findById', function (id, callback) {
    UserSchema.statics.findById = function (id, callback) {
        return this.find({id:id}, callback);
    };
    
    UserSchema.static('findAll', function (callback) {
        return this.find({}, callback);
    });



    console.log('User scheme defined');
    

    UserModel = mongoose.model("users5", UserSchema);
    console.log("Users are defined");

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
            var user = new UserModel({id:id});
            var authenticated = user.authenticate(password, 
                        results[0]._doc.salt, results[0]._doc.hashed_password);

            if(authenticated) {
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

    user.save( function(err){
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
Success to find user:  test01
authenticate called : 123456 -> ff2e33a3d2ffd224c4e4b15c4ea52c8d5483bf91 : ff2e33a3d2ffd224c4e4b15c4ea52c8d5483bf91
Password is identical.

_doc: {
      hashed_password: 'ff2e33a3d2ffd224c4e4b15c4ea52c8d5483bf91',
      name: 'david',
      age: -1,
      _id: [ObjectID],
      id: 'test01',
      salt: '1517727814352',
      created_at: 2019-12-11T06:53:11.096Z,
      updated_at: 2019-12-11T06:53:11.097Z,
      __v: 0
    },
    '$locals': {},
    '$init': true
  }
*/