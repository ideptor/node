process.on('tick', function(param) {
    console.log('tick event occured. - with param: %s', param);
});

process.emit('tick', 'param for tick');


process.on('exit', function() {
    console.log('exit event occured.');
})

setTimeout(function() {
    console.log('system exit after 2 seconds');

    process.exit();
}, 2000);

/*
$ node .\ch04_test02_event.js
tick event occured. - with param: param for tick
system exit after 2 seconds
exit event occured.
*/