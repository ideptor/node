var User = require('./user2.js');

var user1 = new User();
console.log('user info: %s', user1.getUser());
console.log('group info: %s', user1.group);

var user2 = new User('test01', 'david');
console.log('user info: %s', user2.getUser());

/*
node .\module_test1.js
user info: { id: undefined, name: undefined }
group info: { id: 'group01', name: 'friend' }
user info: { id: 'test01', name: 'david' }
*/