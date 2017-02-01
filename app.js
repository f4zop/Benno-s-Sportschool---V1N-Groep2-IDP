var express = require('express');
var path = require ('path');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var exphbs = require ('express-handlebars');
var expressValidator = require ('express-validator');
var flash = require ('connect-flash');
var session = require ('express-session');
var passport = require ('passport');
var LocalStrategy = require ('passport-local');
var mongo = require('mongodb');
var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var routes = require ('./routes/index');
var users = require ('./routes/users');

passport.initialize();
// init app
var app = express();

//view engine
app.set('views', path.join(__dirname , 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());


//public static folder
app.use(express.static(path.join(__dirname + "/public")));
// app.listen(3000);
// console.log('server @ :3000');

app.use(session({
   secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: true}));

  // In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect flash
app.use(flash());

//global vars
app.use(function (req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('Server started on port' +app.get('port'));
});
