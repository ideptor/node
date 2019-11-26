// https://poiemaweb.com/js-regexp

const tel = "0101234567팔";

const myRegExp = /^[0-9]+$/;

console.log(myRegExp.test(tel));


const targetStr = 'This is a pen.';
//const regexr = /is/;
const regexr = /is/i;

console.log(regexr.exec(targetStr));
console.log(regexr.test(targetStr));

console.log(targetStr.match(regexr));
console.log(targetStr.replace(regexr, 'IS'));


console.log(targetStr.search(regexr));
console.log(targetStr.split(regexr));