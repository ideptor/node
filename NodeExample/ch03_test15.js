function add(a, b, callback) {
    var result = a + b;
    callback(result);
}

add(10, 10, function(result) {
    console.log("callback function passed as parameter is called");
    console.log("result: ", result);
});

/*
$ node .\ch03_test15.js
callback function passed as parameter is called
result:  20
*/