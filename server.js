var express = require('express');
var app = express();
var path = require ('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require ('express-handlebars');
var expressValidator = require ('express-validator');
var flash = require ('connect-flash');
var session = require ('express-session');
var passport = require ('passport');
var LocalStrategy = require ('passport-local');
var mongo = require('mongodb');
var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/public');
var db = mongoose.connection;



app.use(express.static(__dirname + "/public"));
app.listen(3000);
console.log('server @ :3000')

//Declarations
Server = mongo.Server,
Db = mongo.Db,
server = new Server('localhost', 27017, {auto_reconnect: true}),
db = new Db('lunchand', server);

//Open database
db.open(function(_err, _db) {
  if(!_err) {
    db.collection('lunchers', {strict: true}, function(_err, _collection) {
      if(_err) {
        var testLuncher = {username:"username",pwd:"password",officeLocation:"Office Location",teams:"teams",shark: true};
        db.collection("lunchers").insert(testLuncher,function(err, element){
          console.log("element inserted");
        });
      } else {
        console.log("Oh it exists");
        // db.getCollection('lunchers')
      }
    });
  } else {
    console.log("Error Connecting to Station DB: " + _err);
  }
});
