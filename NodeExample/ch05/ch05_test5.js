let http = require('http');
let fs = require('fs');

let server = http.createServer((req, res) => {
  console.log('Client request accepted');

    let filename = 'house.png';  // https://www.iconfinder.com/search/?q=house&price=free
    /*
    fs.readFile(filename, (err, data) => {
        res.writeHead(200, {"Content-type":"image/png"});
        res.write(data);
        res.end();
    });*/
    let infile = fs.createReadStream(filename, {flags:'r'});

    infile.pipe(res);
});

let port = 3000;
//server.listen(port, function() {
server.listen(port, () => {
    console.log('Web server started. : %d', port);
});
