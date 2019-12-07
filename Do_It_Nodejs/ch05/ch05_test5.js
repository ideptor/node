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

    // pipe로 연결시킴 - 위와 동일한 기능을 하는 코드임.
    // 단, 헤더 설정을 할 수 없으므로, 필요할때만 활용.
    let infile = fs.createReadStream(filename, {flags:'r'});
    infile.pipe(res);

});

let port = 3000;
//server.listen(port, function() {
server.listen(port, () => {
    console.log('Web server started. : %d', port);
});
