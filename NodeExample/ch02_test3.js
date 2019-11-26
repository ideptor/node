// console.dir(process.env);

//console.log('JAVA_HOME: ', process.env['JAVA_HOME']); 
    // error : process.env는 사용자 정의 환경변수만 보여줌
    // JAVA_HOME 은 시스템 환경 변수임.

// npm install nconf
var nconf = require('nconf'); 
nconf.env();

console.log('JAVA_HOME: ', nconf.get('JAVA_HOME'));

/*
$ node .\ch02_test3.js

{
  ALLUSERSPROFILE: 'C:\\ProgramData',
  APPDATA: 'C:\\Users\\suhyun47.kim\\AppData\\Roaming',
  ChocolateyInstall: 'C:\\ProgramData\\chocolatey',
  ChocolateyLastPathUpdate: '132180763145280824',
  CommonProgramFiles: 'C:\\Program Files\\Common Files',
  'CommonProgramFiles(x86)': 'C:\\Program Files (x86)\\Common Files',
  ...
}

JAVA_HOME:  C:\Program Files\Java\jdk1.8.0_191
*/