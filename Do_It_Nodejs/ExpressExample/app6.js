let express = require('express'),
    http = require('http');

let app = express();

app.use((req, res, next) => {
    console.log("Request is treated by the first middleware");

    let userAgent = req.header('User-Agent');
    let paramName = req.param('name');          // deprecated
    let queryName = req.query.name;

    res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
    res.write('<h1> Express response </h1>');
    res.write('<div><p>User-Agent: '+userAgent+'</p></div>');
    res.write('<div><p>param("name"): '+paramName+'</p></div>');
    res.write('<div><p>query.name: '+queryName+' </p></div>');
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