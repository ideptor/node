var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressErrorHandler = require('express-error-handler');
var mongoose = require('mongoose');

var user = require('./routes/user');
var config = require('./config');


var app = express();

var database;


function connectDB() {

    var databaseUrl = config.db_url;
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
    
    var UserSchema = require('./database/user_schema').createSchema(mongoose);
    UserModel = mongoose.model("users6", UserSchema);

    user.init(database, UserModel);

    console.log("Users are defined");
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


app.post('/process/login', user.login);
app.post('/process/adduser', user.adduser);
app.post('/process/listuser', user.listuser);

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