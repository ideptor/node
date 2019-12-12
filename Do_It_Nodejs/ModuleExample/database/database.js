var mongoose = require('mongoose');

var database = {};

database.init = function(app, config) {
    console.log('database.init called');

    connect(app, config);
}


function connect(app, config) {

    var schemaLen = config.db_schemas.length;
    confole.log('length of schema : %d', schemaLen);

    for(var i=0; i<schemaLen; i++) {
        var curItem = config.db_schemas[i];
        var curSchema = require(curItem.file).createSchema(mongoose);
        console.log('load %s module tpo define schema.', curItem.file);

        var curModel = mongoose.model(curItem.collection, curShcema);
        console.log('Model defind for collection %.', curItem.collection);

        database[curItem.schemaName] = curSchema;
        database[curItem.modelName] = curModel;
        console.log('Add element for database: schema[%s], model[%s]', curItem.schemaName, curItem.modelName);

    }

    app.set('database', database);
    console.log('database object is added as property in app object');
}

module.exports = database;

function connectDB() {

    var databaseUrl = config.db_url;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error'));
    database.on('open', () => {
        console.log('Database connection established.');
        createUserSchema();
    });

    database.on('disconnected', connectDB);
}