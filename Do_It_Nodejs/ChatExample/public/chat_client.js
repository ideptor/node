var host;
var port;
var socket;

$(function() {          // when document loading
    $("#connectionButton").bind('click', function(event) {
        println('connectionButton is clicked.');
        host = $("#hostInput").val();
        port = $("#portInput").val();

        connectToServer();
    });

    $("#sendButton").bind('click', function(event) {
        var sender = $('#senderInput').val();
        var recepient = $('#recepientInput').val();
        var data = $('#dataInput').val();

        var output = {sender:sender, recepient:recepient, command:'chat', type:'text', data:data};
        console.log('Data sent to server : '+JSON.stringify(output));

        if(socket == undefined) {
            alert('No connection to server. Connect to server.');
            return;
        }

        socket.emit('message', output);
    });
});

function connectToServer() {
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

    socket.on('disconnect', function(){
        println("WebSocket is disconnected.");
    });

}

function println(data) {
    console.log(data);
    $("#result").append("<p>"+data+"</p>");
}