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

    $("#loginButton").bind('click', function(event) {
        var id = $('#idInput').val();
        var password = $('#passwordInput').val();
        var alias = $('#aliasInput').val();
        var today = $('#todayInput').val();

        var output = {id:id, password:password, alias:alias, today:today};
        console.log('Data sent to server : '+JSON.stringify(output));

        if(socket == undefined) {
            alert('No connection to server. Connect to server.');
            return;
        }

        socket.emit('login', output);
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

    socket.on('response', function(response) {
        console.log(JSON.stringify(response));
        println('Received: '+response.command+', '+response.code+', '+response.message);
    })

    socket.on('disconnect', function(){
        println("WebSocket is disconnected.");
    });

}

function println(data) {
    console.log(data);
    $("#result").append("<p>"+data+"</p>");
}