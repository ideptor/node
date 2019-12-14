var express = require('express');
var http = require('http');
var path = require('path');
//var bodyParser = require('body-parser');
var socketio = require('socket.io');
var cors = require('cors');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

var server = http.createServer(app).listen(app.get('port'), function() {
    console.log('Server starts at port [%s]', app.get('port'));
});

var io = socketio.listen(server);
console.log('sockt.io is ready to accept request');

io.sockets.on('connection', function(socket) {
    console.log('connection info:', socket.request.connection._peername);

    socket.remoteAddress = socket.request.connection._peername.address;
    socket.reportPort = socket.request.connection._peername.port;
});