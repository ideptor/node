let express = require('express');
let http = require('http');
let path = require('path');
let bodyParser = require('body-parser');   // npm install body-parser --save

let app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({expected:true}));
/*
위의 코드가 없으면 아래와 같은 에러 발생

TypeError: Cannot read property 'id' of undefined
    at C:\gitworkplace\node\NodeExample\ExpressExample\app7.js:16:28
    at Layer.handle [as handle_request] (C:\gitworkplace\node\NodeExample\ExpressExample\node_modules\express\lib\router\layer.js:95:5)
    at trim_prefix (C:\gitworkplace\node\NodeExample\ExpressExample\node_modules\express\lib\router\index.js:317:13)
    at C:\gitworkplace\node\NodeExample\ExpressExample\node_modules\express\lib\router\index.js:284:7
    at Function.process_params (C:\gitworkplace\node\NodeExample\ExpressExample\node_modules\express\lib\router\index.js:335:12)
    at next (C:\gitworkplace\node\NodeExample\ExpressExample\node_modules\express\lib\router\index.js:275:10)
    at serveStatic (C:\gitworkplace\node\NodeExample\ExpressExample\node_modules\serve-static\index.js:75:16)
    at Layer.handle [as handle_request] (C:\gitworkplace\node\NodeExample\ExpressExample\node_modules\express\lib\router\layer.js:95:5)
    at trim_prefix (C:\gitworkplace\node\NodeExample\ExpressExample\node_modules\express\lib\router\index.js:317:13)
    at C:\gitworkplace\node\NodeExample\ExpressExample\node_modules\express\lib\router\index.js:284:7
*/

app.post('/process/login/:name', process_login);

function process_login(req, res) {
    console.log("treat /process/login");

    //let paramId = req.param("id");          // deprecated
    let paramId = req.body.id;
    let paramPassword = req.body.password;
    var paramName = req.params.name;

    res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
    res.write('<h1> Express response </h1>');
    res.write('<div><p>name : '+paramName+'</p></div>');
    res.write('<div><p>id : '+paramId+'</p></div>');
    res.write('<div><p>password : '+paramPassword+' </p></div>');
    res.write('<br><br><a href="/login3.html">Back to Login page</a>');
    res.end();
}

const port = 3000;
http.createServer(app).listen(port, ()=>{
    console.log('Express server started. (port=%d)', port);
});

/*
http://localhost:3000/login2.html 접속해서
id, pwd 입력 후 submit 눌렀을때.


<h1> Express response </h1><div><p>id : idid</p></div><div><p>password : papa </p></div><br><br><a href="/login2.html">Back to Login page</a>
*/