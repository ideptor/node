console.log('argv 속성의 파라미터 수: ' + process.argv.length);
console.dir(process.argv);

if(process.argv.length > 2) {
    console.log("third parameter: %s", process.argv[2]);
}

process.argv.forEach(function(item, index) {
    console.log(index + ' : ', item);
});

/*
$ node .\ch02_test2.js __port 7001

argv 속성의 파라미터 수: 4
[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\gitworkspace\\node\\NodeExample\\ch02_test2.js',
  '__port',
  '7001'
]
third parameter: __port
0 :  C:\Program Files\nodejs\node.exe
1 :  D:\gitworkspace\node\NodeExample\ch02_test2.js
2 :  __port
3 :  7001
*/