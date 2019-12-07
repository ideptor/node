# Express install

## package.json 파일 생성

```
$ npm init

$ more package.json
{
  "name": "expressexample",
  "version": "1.0.0",
  "description": "Do it nodejs",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  },
  "keywords": [
    "nodejs",
    "example"
  ],
  "author": "Suhyun Kim",
  "license": "Apache-2.0"
}
```

## npm 설치

`express` 설치하고 `package.json`에 종속성 관련 부분 업데이트 하기

```
$ npm install express --save


npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN expressexample@1.0.0 No repository field.

+ express@4.17.1
added 50 packages from 37 contributors and audited 126 packages in 14.09s
found 0 vulnerabilities

$ more package.json

...
  "author": "Suhyun Kim",
  "license": "Apache-2.0",
  "dependencies": {
    "express": "^4.17.1"
  }

```