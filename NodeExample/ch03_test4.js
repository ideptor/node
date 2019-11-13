var add = function(a, b) {
  return a + b;
};

var result = add(10, 10);

console.log("add(10,10): %d", result);

/////////////////////////////////////////

var Person = {};

Person["age"] = 20;
Person.name = "소녀시대";   // Person["name"] = "소녀시대";
Person.add = function(a, b) {
  return a + b;
}

console.log(Person);

console.log("Person.add(10,10): %d", Person.add(10, 10));

////////////////////

var Person2 = {
  age : 20,
  name : '소녀시대',
  add: function(a, b) {
    return a + b;
  }
};

console.log(Person2);
console.log("Person2.add(10,10): %d", Person2.add(10, 10));

/*
$ node .\ch03_test4.js
add(10,10): 20
{ age: 20, name: '소녀시대', add: [Function] }
Person.add(10,10): 20
{ age: 20, name: '소녀시대', add: [Function: add] }
Person2.add(10,10): 20
*/