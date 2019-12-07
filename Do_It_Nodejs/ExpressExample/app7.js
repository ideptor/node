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

app.use((req, res, next) => {
    console.log("Request is treated by the first middleware");

    let userAgent = req.header('User-Agent');
    //let paramId = req.param("id");          // deprecated
    let paramId = req.body.id;
    let paramPassword = req.body.password;

    res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
    res.write('<h1> Express response </h1>');
    res.write('<div><p>User-Agent: '+userAgent+'</p></div>');
    res.write('<div><p>id : '+paramId+'</p></div>');
    res.write('<div><p>password : '+paramPassword+' </p></div>');
    res.end();
});

const port = 3000;
http.createServer(app).listen(port, ()=>{
    console.log('Express server started. (port=%d)', port);
});

/*
http://localhost:3000/?name=mike

Express response
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.146 Whale/2.6.88.19 Safari/537.36
param("name"): mike
query.name: mike
*/