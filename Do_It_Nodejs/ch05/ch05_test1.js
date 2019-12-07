let http = require('http');

let server = http.createServer();

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

//server.on('request', function(req, res) {
server.on('request', (req, res) => {
    console.log('Client request accepted');

    res.writeHead(200, {"content-type":"text.html; charset=utf-8"});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head><title>Response page</title></head>");
    res.write("<body><h1>Response from nodejs</body>");
    res.write("</html>");
    res.end();
//    console.dir(req);
});

//server.on('close', function() {
server.on('close', () => {
    console.log('Server exit');
});

/*
PS C:\gitworkplace\node\NodeExample\ch05> node .\ch05_test1.js
Web server started. : 3000
Client connected: ::1, 3000
Client request accepted
Client connected: ::1, 3000

     [Symbol(asyncId)]: 2
    },
    timeout: 120000,
    parser: HTTPParser {
      '0': [Function: parserOnHeaders],
      '1': [Function: parserOnHeadersComplete],
      '2': [Function: parserOnBody],
      '3': [Function: parserOnMessageComplete],
      '4': [Function: bound onParserExecute],
      _headers: [],
      _url: '',
      socket: [Circular],
      incoming: [Circular],
      outgoing: null,
      maxHeaderPairs: 2000,
      _consumed: true,
      onIncoming: [Function: bound parserOnIncoming],
      parsingHeadersStart: 0
    },
    on: [Function: socketListenerWrap],
    addListener: [Function: socketListenerWrap],
    prependListener: [Function: socketListenerWrap],
    _paused: false,
    _httpMessage: ServerResponse {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      _last: false,
      chunkedEncoding: false,
      shouldKeepAlive: true,
      useChunkedEncodingByDefault: true,
      sendDate: true,
      _removedConnection: false,
      _removedContLen: false,
      _removedTE: false,
      _contentLength: null,
      _hasBody: true,
      _trailer: '',
      finished: false,
      _headerSent: false,
      socket: [Circular],
      connection: [Circular],
      _header: null,
      _onPendingData: [Function: bound updateOutgoingData],
      _sent100: false,
      _expect_continue: false,
      [Symbol(kNeedDrain)]: false,
      [Symbol(isCorked)]: false,
      [Symbol(kOutHeaders)]: null
    },
    [Symbol(asyncId)]: 7,
    [Symbol(kHandle)]: TCP {
      reading: true,
      onconnection: null,
      _consumed: true,
      [Symbol(owner)]: [Circular]
    },
    [Symbol(lastWriteQueueSize)]: 0,
    [Symbol(timeout)]: Timeout {
      _idleTimeout: 120000,
      _idlePrev: [TimersList],
      _idleNext: [TimersList],
      _idleStart: 2778,
      _onTimeout: [Function: bound ],
      _timerArgs: undefined,
      _repeat: null,
      _destroyed: false,
      [Symbol(refed)]: false,
      [Symbol(asyncId)]: 8,
      [Symbol(triggerId)]: 7
    },
    [Symbol(kBuffer)]: null,
    [Symbol(kBufferCb)]: null,
    [Symbol(kBufferGen)]: null,
    [Symbol(kBytesRead)]: 0,
    [Symbol(kBytesWritten)]: 0
  },
  httpVersionMajor: 1,
  httpVersionMinor: 1,
  httpVersion: '1.1',
  complete: false,
  headers: {
    host: 'localhost:3000',
    connection: 'keep-alive',
    'cache-control': 'max-age=0',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.146 Whale/2.6.88.19 Safari/537.36',
    'sec-fetch-mode': 'navigate',

    */
