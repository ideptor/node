// 서버에서 다른 웹 싸이트의 데이터를 가져와 응답하기

let http = require('http');

let options = {
    host : 'google.com',
    port : 80,
    path : '/'
};

let req = http.get(options, (res) => {
    let resData = '';
    res.on('data', (chunk) => {
        resData += chunk;
    });

    res.on('end', () => {
        console.log(resData);
    });
});

req.on('error', (err) => {
    console.log("error : "+err.message);
});

/*
PS C:\gitworkplace\node\NodeExample\ch05> node .\ch05_test7.js
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.com/">here</A>.
</BODY></HTML>
*/