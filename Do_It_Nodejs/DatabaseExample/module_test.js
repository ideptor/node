var user1 = require('./user1.js');

function showUser() {
    return user1.getUser().name + ',' + user1.group.name;
    //return user1.group.name;
}

console.log('user info: %s', showUser());

var user = new user1();