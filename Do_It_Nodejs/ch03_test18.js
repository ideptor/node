function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.walk = function(speed) {
    console.log("working spped is ", speed, "km");
}

var person1 = new Person("Girl", 20);
var person2 = new Person("Days", 22);

console.log(person1.name + "'s method walking(10)");
person1.walk(15);

console.dir(Person);
console.dir(person1);
/*
$ node .\ch03_test18.js
Girl's method walking(10)
working spped is  15 km
[Function: Person]
Person { name: 'Girl', age: 20 }
*/