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

    socket.on('message', (message) => {messageEventHandler(socket, message)});
    socket.on('login', (message) => {loginEventHandler(socket, message);});
    socket.on('room', (message)=>{roomEventHandler(socket, message);});
});

function roomEventHandler(socket, message) {
    console.log('[room] event is received.');
    console.dir(message);

    if(message.command === 'create') {
        if(io.sockets.adapter.rooms[message.roomId]) {
            console.log('The room already exists : ' + message.roomId);
            return;
        }
        console.log('Create new room');
        
        socket.join(message.roomId);

        var curRoom = io.sockets.adapter.rooms[message.roomId];
        curRoom.id = message.roomId;
        curRoom.name = message.roomName;
        curRoom.owner = message.roomOwner;

        console.dir(curRoom);

    } else if (message.command === 'update') {
        var curRoom = io.sockets.adapter.rooms[message.roomId];
        curRoom.id = message.roomId;
        curRoom.name = message.roomName;
        curRoom.owner = message.roomOwner;   

    } else if (message.command === 'delete') {
        socket.leave(message.roomId);
        
        if(io.sockets.adapter.rooms[message.roomId]) {
            delete io.sockets.adapter.rooms[message.roomId];
        } else {
            console.log('Room is not created. '+message.roomName);
        }
    }

    var roomList = getRoomList();

    var output = {command:'list', rooms:roomList};

    socket.emit('room', output);
}

function getRoomList() {
    console.dir(io.sockets.adapter.rooms);

    var roomList = [];

    Object.keys(io.sockets.adapter.rooms).forEach(function(roomId) {
        console.log('current room id:'+roomId);
        
        var outRoom = io.sockets.adapter.rooms[roomId];
        console.dir(outRoom)
        if(outRoom.id !== undefined && outRoom.name !== undefined) {
            roomList.push(outRoom);
        }
        /*
        var foundDefault = false;
        var index = 0;
        Object.keys(outRoom).forEach(function(key) {
            console.log('#'+index+' : '+key+', '+outRoom[key]);

            if(roomId == key) {
                foundDefault = true;
                console.log('this is default room');
            }
            index++;
        });

        if(!foundDefault) {
            roomList.push(outRoom);
        }
        */
    });

    console.log('[ROOM LIST]');
    console.dir(roomList)

    return roomList;
}

function loginEventHandler(socket, message) {
    console.log('[login] event is received.');
    console.dir(message);

    // no authentication process - intentionally

    console.log('socket id: '+socket.id);
    login_ids[message.id] = socket.id;
    socket.login_id = message.id;

    console.log('num of clients: %d', Object.keys(login_ids).length);
    console.dir(login_ids);

    sendResponse(socket, 'login', '200', 'Login is completed.');
}

function sendResponse(socket, command, code, message) {
    var statusObj = {command:command, code:code, message:message};
    socket.emit('response', statusObj);
}

function messageEventHandler(socket, message) {
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
/*
node .\app.js
sockt.io is ready to accept request
Server starts at port [3000]
connection info: { address: '::1', family: 'IPv6', port: 54120 }
[login] event is received.
{ id: 'test01',
  password: '123456',
  alias: 'Girl\'s Age',
  today: 'Good Day!' }
socket id: avFhpQ9gsZAqLzP4AAAC   
num of clients: 1
{ test01: 'avFhpQ9gsZAqLzP4AAAC' }
[room] event is received.
{ command: 'create',
  roomId: 'meeting01',
  roomName: 'Young\'s club',
  roomOwner: 'test01' }
Create new room
Room {
  sockets: { avFhpQ9gsZAqLzP4AAAC: true },
  length: 1,
  id: 'meeting01',
  name: 'Young\'s club',
  owner: 'test01' }
{ MfzkfyHmZLdAEbw1AAAA: Room { sockets: { MfzkfyHmZLdAEbw1AAAA: true }, length: 1 },
  avFhpQ9gsZAqLzP4AAAC: Room { sockets: { avFhpQ9gsZAqLzP4AAAC: true }, length: 1 },
  meeting01:
   Room {
     sockets: { avFhpQ9gsZAqLzP4AAAC: true },
     length: 1,
     id: 'meeting01',
     name: 'Young\'s club',
     owner: 'test01' } }
current room id:MfzkfyHmZLdAEbw1AAAA
Room { sockets: { MfzkfyHmZLdAEbw1AAAA: true }, length: 1 }
current room id:avFhpQ9gsZAqLzP4AAAC
Room { sockets: { avFhpQ9gsZAqLzP4AAAC: true }, length: 1 }
current room id:meeting01
Room {
  sockets: { avFhpQ9gsZAqLzP4AAAC: true },
  length: 1,
  id: 'meeting01',
  name: 'Young\'s club',
  owner: 'test01' }
[ROOM LIST]
[ Room {
    sockets: { avFhpQ9gsZAqLzP4AAAC: true },
    length: 1,
    id: 'meeting01',
    name: 'Young\'s club',
    owner: 'test01' } ]
*/