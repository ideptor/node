# Install

## 1. Download & install Nodejs

https://nodejs.org/en/download/

## 2. Download & install Visual Studio Code

https://code.visualstudio.com/

## 유용한 함수들

`console`객체를 활용한 **time** 측정
- 시작할때 `console.time(id)` 호출 후 종료할때 `console.timeEnd(id)`를 클릭하면 해당 기간의 time을 ms 단위로 반환 
```
> console.time(1);
undefined
> console.end(1);
> console.timeEnd(1);
1: 18200.337ms
```
