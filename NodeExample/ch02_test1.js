var result = 0;

console.time('duration_sum');

for(var i=0; i<= 1000; i++) {
    result += i;
}

console.timeEnd('duration_sum');
console.log('the sum form 1 to 1000 is %d', result);
console.log('current file: %s', __filename);
console.log('current path: %s', __dirname);

var person = {name:"소녀시대", age:20};
console.log(person);
console.dir(person);

/* output

duration_sum: 0.085ms
the sum form 1 to 1000 is 500500
current file: D:\gitworkspace\node\NodeExample\ch02_test1.js
current path: D:\gitworkspace\node\NodeExample
{ name: '소녀시대', age: 20 }
{ name: '소녀시대', age: 20 }

*/