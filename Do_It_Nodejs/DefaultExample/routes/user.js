var database;
var UserModel;
//var UserSchema;

function init (db, model) {
    console.log('init called');

    database = db;
    //UserSchema = schema;
    UserModel = model;
}
function authUser ( id, password, callback) {
    console.log('authUser called.');

    //console.dir(database);

    UserModel.findById(id, (err, results)=> {
        if(err) {
            callback(err, null);
            return;
        }

        console.log('Success to find user with id:[%s]', id);
        console.dir(results);
        
        if(results.length>0){
            console.log('Success to find user: ', id);
            var user = new UserModel({id:id});
            var authenticated = user.authenticate(password, 
                        results[0]._doc.salt, results[0]._doc.hashed_password);

            if(authenticated) {
                console.log('Password is identical.');
                callback(null, results);
            } else {
                console.log('Password is not identical.');
                callback(null, results);
            }

        } else{
            console.log('Fail to find user.');
            callback(null, null);
        }
    });
}

function addUser (id, password, name, callback)  {
    console.log("addUser called.");
    console.dir(callback);

    var user = new UserModel({'id':id, 'password':password, 'name':name});

    user.save( function(err){
        if(err) {
            callback(err, null);
            return;
        }
        console.log("User info added.");
        callback(null, user);
    });
};

function login(req, res) {
    console.log("/process/login called");

    var paramId = req.body.id;
    var paramPassword = req.body.password;

    if(database) {
        authUser(paramId, paramPassword, (err, docs)=>{
            if(err) throw err;

            if(docs) {
                console.dir(docs);

                res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
                res.write('<h1> Login Success </h1>');
                res.write('<div><p>id : '+paramId+'</p></div>');
                res.write('<div><p>name : '+docs[0].name+' </p></div>');
                res.write('<br><br><a href="/public/login.html">Login again</a>');
                res.end();
            } else {

                res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
                res.write('<h1> Login Failed </h1>');
                res.write('<div><p> Invalid id and password. </p></div>');
                res.write('<br><br><a href="/public/login.html">Login again</a>');
                res.end();                
            }
        });
    } else {
        
        res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
        res.write('<h2> Database connection fail </h2>');
        res.write('<div><p> Cannot connect database. </p></div>');
        res.end();
    }
}

function adduser(req, res){
    console.log('/process/adduser called');

    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;

    if(database) {
        addUser(paramId, paramPassword, paramName, function (err, result) {
            if(err) { throw err;}

            if(result) {
                console.dir(result);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>Add user success</h2>');
                res.end();
            } else {
                res.writeHead('200', {'Content-type':'text/html;charset=utf8'});
                res.write('<h2>Add user failed</h2>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>Fail to connect database</h2>');
        res.end();
    }
}

function listuser(req,res){

    console.log('/process/listuser called.');
    
    if(database) {
        UserModel.findAll( function(err, results){
            if(err) {
                callback(err, null);
                return;
            }

            if(results) {
                console.dir(results);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
                res.write('<h2>User list</h2>');
                res.write('<div><ul>');

                for(var i=0; i<results.length; i++){
                    var curId = results[i]._doc.id;
                    var curName = results[i]._doc.name;
                    res.write('   <li>#'+i+':'+curId+','+curName+'</li>');
                }

                res.write('</ul></div>');
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
                res.write('<h2>Fail to retrieve user list');
                res.end();
            }

        });
    }
    
}


module.exports.init = init;
module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;