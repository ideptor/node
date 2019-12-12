
function user(id, name) {
    this.id = id;
    this.name = name;
};

user.prototype.getUser = function() {
    return {id:this.id, name: this.name};
},
user.prototype.group = {id:'group01', name:'friend'}

module.exports = user;