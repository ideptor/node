// https://poiemaweb.com/js-regexp
//https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D
//https://regexper.com/

/*
const tel = "0101234567팔";

const myRegExp = /^[0-9]+$/;

console.log(myRegExp.test(tel));    // false


const targetStr = 'This is a pen.';
//const regexr = /is/;
const regexr = /is/i;

console.log(regexr.exec(targetStr));    
console.log(regexr.test(targetStr));

console.log(targetStr.match(regexr));
console.log(targetStr.replace(regexr, 'IS'));


console.log(targetStr.search(regexr));
console.log(targetStr.split(regexr));

*/


/*
const targetStr = 'Is this all there is?';

// 문자열 is를 대소문자를 구별하여 한번만 검색한다.
let regexr = /is/;

console.log(targetStr.match(regexr)); // [ 'is', index: 5, input: 'Is this all there is?' ]
console.log(targetStr.match(regexr).length); // 1

// 문자열 is를 대소문자를 구별하지 않고 대상 문자열 끝까지 검색한다.
regexr = /is/ig;

console.log(targetStr.match(regexr)); // [ 'Is', 'is', 'is' ]
console.log(targetStr.match(regexr).length); // 3

*/

/*
const targetStr = 'AA BB Aa Bb';

// 임의의 문자 3개
var regexr = /.../g;
console.log(targetStr.match(regexr)); // [ 'AA ', 'BB ', 'Aa ' ]

// 임의의 문자 2개
var regexr = /../g;
console.log(targetStr.match(regexr)); // [ 'AA', ' B', 'B ', 'Aa', ' B' ]
*/

/*
const targetStr = 'AA BB Aa Bb';

// 'A'를 대소문자 구분없이 반복 검색
const regexr = /A/ig;

console.log(targetStr.match(regexr)); // [ 'A', 'A', 'A', 'a' ]
*/

/*
const targetStr = 'AA AAA BB Aa Bb';

// 'A'가 한번이상 반복되는 문자열('A', 'AA', 'AAA', ...)을 반복 검색
const regexr = /A+/g;

console.log(targetStr.match(regexr)); // [ 'AA', 'AAA', 'A' ]
*/

/*
const targetStr = 'AA BB Aa Bb';

// 'A' 또는 'B'를 반복 검색
const regexr = /A|B/g;

console.log(targetStr.match(regexr)); // [ 'A', 'A', 'B', 'B', 'A', 'B' ]
*/


/*
const targetStr = 'AA AB BB CC CA DDD ZZ Aa Bb';

// 첫번째 문자가 'A' 이고 계속해서 'A'가 오는 경우 또는 
// 첫번째 문자가 'B' 이고 계속해서 'B'가 되는 문자열을 반복 검색
// 'A', 'AA', 'AAA', ... 또는 'B', 'BB', 'BBB', ...
const regexr = /A+|B+/g;

console.log(targetStr.match(regexr)); // [ 'AA', 'A', 'B', 'BB', 'A', 'B' ]

*/

/*

const targetStr = 'AA AB BB CC DDD ZZ Aa Bb';

// 첫번째 문자가 'A' 또는 'B'가 이고 그 이후에 'A' 또는 'B'가 되는 경우를 반복검색한다.

const regexr = /[AB]+/g;

console.log(targetStr.match(regexr)); // AA', 'AB', 'BB', 'A', 'B' 
*/


/*
const targetStr = 'AA AB BB CC DDD ZZ Aa Bb';

// 첫번째 문자가 'A' ~ 'C'이고 그 이후에도 'A' ~ 'C'가 오는 문자열을 검색


const regexr = /[A-Ca-c]+/g;

console.log(targetStr.match(regexr)); // 'AA', 'AB', 'BB', 'CC', 'Aa', 'Bb'
*/

/*
const targetStr = 'AA BB Aa Bb 24,000';

// '0' ~ '9' 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
let regexr = /[\d,]+/g;

console.log(targetStr.match(regexr)); // [ '24,000' ]

// '0' ~ '9'가 아닌 문자(숫자가 아닌 문자) 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
regexr = /[\D,]+/g;

console.log(targetStr.match(regexr)); // [ 'AA BB Aa Bb ', ',' ]
*/

/*
const targetStr = 'AA BB Aa Bb 24,000';

// 알파벳과 숫자 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
let regexr = /[\w,]+/g;

console.log(targetStr.match(regexr)); // [ 'AA', 'BB', 'Aa', 'Bb', '24,000' ]

// 알파벳과 숫자가 아닌 문자 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
regexr = /[\W,]+/g;

console.log(targetStr.match(regexr)); // [ ' ', ' ', ' ', ' ', ',' ]

*/

/*
const targetStr = 'This is a book. He is my son. That is an Orange.';

// 알파벳과 숫자 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
let regexr = /is [am]/g;

console.log(targetStr.match(regexr)); 
*/

/*
const url = 'http://example.com';

// 'http'로 시작하는지 검사
// ^ : 문자열의 처음을 의미한다.
const regexr1 = /^http:\/\//;
const regexr2 = /.com$/;

console.log(regexr1.test(url)); // true
console.log(regexr2.test(url)); // true

*/

/*
const targetStr = ' Hi!';

// 1개 이상의 공백으로 시작하는지 검사
// \s : 여러 가지 공백 문자 (스페이스, 탭 등) => [\t\r\n\v\f]
const regexr = /^[ ]+/;

console.log(regexr.test(targetStr)); // true
*/

/*
const email = 'ungmo2@gmail.com';

const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

console.log(regexr.test(email)); // true
*/

const targetStr = 'AA BB 30,000 Aa Bb 24,000';

// '0' ~ '9'가 아닌 문자(숫자가 아닌 문자) 또는 ','가 한번 이상 반복되는 문자열을 반복 검색
regexr = /[\d,]+/g;
console.log(targetStr.match(regexr)); // ['30,000' '24,000' ]