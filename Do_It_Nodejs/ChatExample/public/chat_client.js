var socket;

$(function() {          // when document loading
    $("#connectionButton").bind('click', function(event) {
        println('connectionButton is clicked.');
        var host = $("#hostInput").val();
        var port = $("#portInput").val();

        connectToServer(host, port);
    });

    $("#sendButton").bind('click', function(event) {
        
        var chattype = $("#chattype option:selected").val();
        var recepient = $('#recepientInput').val(); 
        if(chattype === 'groupchat') {
            recepient = $('#roomIdInput').val();
        }
        send('message', {
            sender:$('#senderInput').val(), 
            recepient: recepient, 
            command: chattype, 
            type:'text', 
            data:$('#dataInput').val()});
    });

    $("#loginButton").bind('click', function(event) {

        send('login', {
            id:$('#idInput').val(),
            password:$('#passwordInput').val(), 
            alias:$('#aliasInput').val(), 
            today:$('#todayInput').val()});
    });

    $("#createRoomButton").bind('click', function(event) {

        send('room', { 
            command: "create",
            roomId: $('#roomIdInput').val(),
            roomName:$('#roomNameInput').val(), 
            roomOwner: $('#idInput').val()});
    });

    $("#updateRoomButton").bind('click', function(event) {

        send('room', { 
            command: "update",
            roomId : $('#roomIdInput').val(),
            roomName:$('#roomNameInput').val(), 
            roomOwner: $('#idInput').val()});
    });

    $("#deleteRoomButton").bind('click', function(event) {

        send('room', { 
            command: "delete",
            roomId : $('#roomIdInput').val()});
    });

    $("#joinRoomButton").bind('click', function(event) {
        send('room', {
            command : "join",
            roomId : $("#roomIdInput").val()
        });
    });

    $("#leaveRoomButton").bind('click', function(event) {
        send('room', {
            command : "leave", 
            roomId : $("#roomIdInput").val()
        });
    });

});

function send(event, output) {
    console.log('Data sent to server : '+JSON.stringify(output));

    if(socket == undefined) {
        alert('No connection to server. Connect to server.');
        return;
    }

    socket.emit(event, output);
}

function connectToServer(host, port) {
    var options = { "froceNew": true };
    var url = 'http://' + host+":"+port;
    socket = io.connect(url, options);
    
    socket.on('connect', function() {
        println("WebSocket is connected. : " + url);

    });

    socket.on('message', function(message) {
        console.log(JSON.stringify(message));

        println('<p>Received: '+message.sender + ', '+message.recepient+', '
            +message.command+', '+message.type+', '+message.data+'</p>');
    });

    socket.on('response', function(response) {
        console.log(JSON.stringify(response));
        println('Received: '+response.command+', '+response.code+', '+response.message);
    });

    socket.on('room', function(data) {
        console.log(JSON.stringify(data));

        println('<p>Room event : ' + data.command + '</p>');
        if(data.command == 'list') {
            println('<p>Room list is received.</p>');
            var roomCount = data.rooms.length;
            $("#roomList").html('<p>Room List (' + roomCount + ')</p>');
            for(var i=0; i<roomCount; i++) {
                room = data.rooms[i];
                $("#roomList").append('<p>Room#'+i+': '+room.id+', '
                    +room.name+', '+room.owner+'</p>');
            }
        }
    });

    socket.on('disconnect', function(){
        println("WebSocket is disconnected.");
    });

}

function println(data) {
    console.log(data);
    $("#result").append("<p>"+data+"</p>");
}