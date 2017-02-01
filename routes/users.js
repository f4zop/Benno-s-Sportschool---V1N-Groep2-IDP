var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


//login
router.get('/login', function(req, res){
  res.render('login');
});

//register
router.get('/register', function(req, res){
  res.render('register');
});

//register
router.post('/register', function(req, res){

  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  //validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password does not match').equals(req.body.password);


  // console.log(name)
  var errors = req.validationErrors()
  //
  if(errors){
    res.render('register',{
      errors:errors
      // console.log("passedsadas");
    });
  }
  else{
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);

    });

    req.flash('success_msg', 'you are registered and can now login');

    res.redirect('/users/login');

  }
});


passport.use(new LocalStrategy(
  function(username, password, done){
    User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message:'Unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch)
    {
      if(err) throw err;
      if(isMatch)
      {
        return done(null, user);
      }
      else
      {
        return done(null, false, {message: 'Invalid password'});
      }
    });
  });
}));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.GetUserById(id, function(err, user){
    done(err, user)
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash:true}),
  function(req, res){
    res.redirect('/')
  });
router.get('/logout', function(req, res){
  req.logout();

  req.flash('success_msg', 'you are logged out')
});

module.exports = router;
