let http = require('http');

let server = http.createServer((req, res) => {
  console.log('Client request accepted');

  res.writeHead(200, {"content-type":"text.html; charset=utf-8"});
  res.write("<!DOCTYPE html>");
  res.write("<html>");
  res.write("<head><title>Response page</title></head>");
  res.write("<body><h1>Response from nodejs</body>");
  res.write("</html>");
  res.end();
});

let port = 3000;
//server.listen(port, function() {
server.listen(port, () => {
    console.log('Web server started. : %d', port);
});

//server.on('connection', function(socket) {
server.on('connection', (socket) => {
    let addr = socket.address();
    console.log('Client connected: %s, %d', addr.address, addr.port);
});


//server.on('close', function() {
server.on('close', () => {
    console.log('Server exit');
});
