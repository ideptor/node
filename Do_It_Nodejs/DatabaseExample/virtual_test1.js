var mongodb = require('mongodb');
var mongoose = require('mongoose');

var database;
var UserSchema;
var UserModel;

const databaseUrl = 'mongodb://localhost:27017/shopping';

function connectDB() {
    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error'));
    database.on('open', function() {
        console.log('Connected to database :'+databaseUrl);

        createUserSchema();

        doTest();
    });

    database.on('disconnected', connectDB);
}

function createUserSchema() {

    UserSchema = mongoose.Schema({
        id: {type:String, required:true, unique:true},
        //password: {type:String, required:true},
        name: {type:String, index:'hashed', required: true, 'default':''},
        age: {type:Number, 'default': -1},
        created_at: {type:Date, index:{unique:false}, 'default':Date.now},
        updated_at: {type:Date, index:{unique:false}, 'default':Date.now}
    });

    UserSchema.virtual('info').set(function(info) {
        var splitted = info.split(' ');
        this.id = splitted[0];
        this.name = splitted[1];
        console.log('virtual info set: %s, %s', this.id, this.name);
    })
    .get(function() {
        return this.id + ' ' + this.name
    });

    UserModel = mongoose.model('users4', UserSchema);
    console.log('UserSchema defined');
}

function doTest() {
    var user = new UserModel({'info': 'test02 tiara'});

    user.save(function(err) {
        if(err) {throw err;}

        console.log('User data is added.');

        findAll();
    });

    console.log('info property is set.');
    console.log('id: %s, name: %s', user.id, user.name);
}

function findAll() {
    UserModel.find({}, function(err, results) {
        if(err) {throw err;}

        if(results) {
            console.log('Retrieved user document #0 -> id: %s, name: %s',
            results[0]._doc.id, results[0]._doc.name);
        }
    });
}

connectDB();


/*
> node .\virtual_test1.js
(node:6432) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:6432) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
Connected to database :mongodb://localhost:27017/shopping
UserSchema defined
virtual info set: test02, tiara
info property is set.
id: test02, name: tiara
(node:6432) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
User data is added.
Retrieved user document #0 -> id: test01, name: girs_age
*/