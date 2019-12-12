/*
exports.getUser = function() {
    return {id:'test01', name: 'david'};
};

exports.group = {id:'group01', name:'friend'};
*/

var user = {
    getUser: function() {
        return {id:'test01', name: 'david'};
    },
    group: {id:'group01', name:'friend'}
};


function user = {
    getUser: function() {
        return {id:'test01', name: 'david'};
    },
    group: {id:'group01', name:'friend'}
};


module.exports = user;