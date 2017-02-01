var express = require('express');
var router = express.Router();

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


  console.log(name)
//   var errors = req.validationErrors()
//
//   if(errors){
//     // res.render('register',{
//     //   errors:errors
//     console.log("passedsadas");
//     // });
//   }
//   else{
//     console.log("passed");
//   }
});


module.exports = router;
