module.exports = {
    server_port: 3000,
    db_url: 'mongodb://localhost:27017/shopping',
    db_schemas:[ {
        file:'./user_schema',
        collection:'user3',
        chemaName:'UserSchema',
        modelName:'UserModel'
    }]
}