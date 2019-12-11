var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {

    var UserSchema = mongoose.Schema({
        id: {type:String, required:true, unique:true},
        hashed_password: {type:String, required:true, 'default':' '},
        salt: {type:String, required: true},
        name: {type:String, index: 'hased', 'default': ' '},
        age: {type:Number, 'default': -1},
        created_at: {type:Date, index:{unique:false}, 'default':Date.now},
        updated_at: {type:Date, index:{unique:false}, 'default':Date.now}
    });

    UserSchema.virtual('password').set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
        console.log('virtual password called : '+this.hashed_password);
    }).get(function() {return this._password});

    UserSchema.method('encryptPassword', function(plainText, inSalt) {
        if(inSalt) {
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
        } else {
            return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
        }
    });

    UserSchema.method('makeSalt', function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    })

    UserSchema.method('authenticate', function(plainText, inSalt, hashed_password) {
        if(inSalt) {
            console.log('authenticate called : %s -> %s : %s', plainText,
                        this.encryptPassword(plainText, inSalt), hashed_password);
            return this.encryptPassword(plainText, inSalt) === hashed_password;
        } else {
            console.log('authenticate called : %s -> %s : %s', plainText,
                        this.encryptPassword(plainText), hashed_password);
            return this.encryptPassword(plainText) === hashed_password;
        }
    });
    
    UserSchema.path('id').validate(function(id) {
        return id.length;
    }, 'id is absent.');

    UserSchema.path('name').validate(function(name) {
        return name.length;
    }, 'name is absent.')

    //UserSchema.static('findById', function (id, callback) {
    UserSchema.statics.findById = function (id, callback) {
        return this.find({id:id}, callback);
    };
    
    UserSchema.static('findAll', function (callback) {
        return this.find({}, callback);
    });
    console.log('User scheme defined');

    return UserSchema;
};

module.exports = Schema;