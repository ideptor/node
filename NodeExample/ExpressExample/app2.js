let express = require('express')
    , http = require('http')
    , path = require('path');

let app = express();

app.use((req, res, next) => {
    console.log("Request is treated by the first middleware");

    res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
    res.write('<title>Express Example</title>');
    res.end('<h1>Express Server is working</h1>');
})

const port = 3000;
http.createServer(app).listen(port, ()=>{
    console.log('Express server started. (port=%d)', port);
})