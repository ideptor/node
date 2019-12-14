var express = require('express');
var http = require('http');
var path = require('path');
//var bodyParser = require('body-parser');
var socketio = require('socket.io');
var cors = require('cors');

var login_ids = {};
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

    socket.on('message', (message) => {receiveMessage(socket, message)});
    socket.on('login', (message) => {login(socket, message);});
});

function login(socket, data) {
    console.log('[login] event is received.');
    console.dir(data);

    // no authentication process - intentionally

    console.log('socket id: '+socket.id);
    login_ids[data.id] = socket.id;
    socket.login_id = data.id;

    console.log('num of clients: %d', Object.keys(login_ids).length);
    console.dir(login_ids);

    sendResponse(socket, 'login', '200', 'Login is completed.');
}

function sendResponse(socket, command, code, message) {
    var statusObj = {command:command, code:code, message:message};
    socket.emit('response', statusObj);
}

function receiveMessage(socket, message) {
    console.log('[message] event is received.');
    console.dir(message);

    if(message.recepient == 'ALL') {
        console.log('Sending message to all clients including myself.');
        io.sockets.emit('message', message);
    } else {
        recepient_socket_id = login_ids[message.recepient];
        if(recepient_socket_id) {
            io.sockets.connected[recepient_socket_id].emit('message', message);

            sendResponse(socket, 'message', '200', 'Message has been sent.');
        } else {
            sendResponse(socket, 'fail', '404', 'Cannot find id: '+message.recepient);
        }
    }
}
