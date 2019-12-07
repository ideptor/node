let express = require('express');
let http = require('http');
let path = require('path');
let bodyParser = require('body-parser');   // npm install body-parser --save
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var multer = require('multer');
var fs = require('fs'); 

let app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({expected:true}));
app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));


app.post('/process/photo')
app.post('/process/login', (req, res) => {
    console.log("/process/login called");

    //let paramId = req.param("id");          // deprecated
    let paramId = req.body.id;
    let paramPassword = req.body.password;

    console.log('id:%s pwd:%s', paramId, paramPassword.length);

    if(req.session.user) {
        console.log('Move to product info - already logged in');

        res.redirect('/public/product.html');
    } else {
        req.session.user = {
            id: paramId,
            name: 'Girl\'s age',
            authorized: true
        };
        res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
        res.write('<h1> Login Success </h1>');
        res.write('<div><p>id : '+paramId+'</p></div>');
        res.write('<div><p>password : '+paramPassword+' </p></div>');
        res.write('<br><br><a href="/process/product">Move to product info page</a>');
        res.end();
    }
});

app.get('/process/logout', (req, res) => {
    console.log('/process/logout called');

    if(req.session.user) {
        console.log('Try logout');

        req.session.distroy((err)=>{
            if(err) {
                throw err;
            }
            console.log('Logged out - session is destroied.');
        });
    } else {
        console.log('You are not logged in.');
    }
    res.redirect('/public/login2.html');
});

app.get('/process/showCookie', (req, res)=> {
    console.log('/process/showKookie called');

    res.send(req.cookies);
});

app.get('/process/setUserCookie', (req, res)=> {
    console.log('/process/setUserCookie called');

    res.cookie('user', {
        id: 'mike',
        name: 'Girl\'s age',
        authorized: true
    });

    res.redirect('/process/showCookie');
});

app.get('/process/product', (req, res)=>{
    console.log('/process/product called');

    if(req.session.user) {
        res.redirect('/product.html');
    } else {
        res.redirect('/login2.html');
    }
});

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './my-uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.png');
        }
    }),
    limits: {
        files: 10,
        fileSize: 1024 * 1024
    },
});

app.post('/process/photo', upload.array('photo'), (req,res) => {

    console.log('/process/photo called');

    var files = req.files;
    console.dir(req);
    console.dir(req.files);

    var originalname = '',
        name = '';
        mimetype = '';
        size = 0;
    
    if(Array.isArray(files)) {
        console.log('Number of files in array:%d', files.length);

        for(var index=0; index<files.length; index++) {
            originalname = files[index].originalname;
            name = files[index].filename;
            mimetype = files[index].mimetype;
            size = files[index].size;
        }
    } 

    console.log('Current file info : ' + originalname + ', ' + name + ', ' +
                    mimetype + ', ' + size);
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
    res.write('<h3>File upload success</h3>');
    res.write('<hr/>');
    res.write('<p>original file name: '+originalname+' -> saved as : '+name+'</p>');
    res.write('<p>Mime Type: '+mimetype+'</p>');
    res.write('<p>file size: '+size+'</p>');
    res.end();

});

const port = 3000;
http.createServer(app).listen(port, ()=>{
    console.log('Express server started. (port=%d)', port);
});




/*
http://localhost:3000/photo.html


<h1> Express response </h1><div><p>id : idid</p></div><div><p>password : papa </p></div><br><br><a href="/login2.html">Back to Login page</a>
*/