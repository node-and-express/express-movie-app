var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet=require('helmet');
var cors = require('cors');
var session=require('express-session');

//auth with passport
const passport=require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeeRouter = require('./routes/employee');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors())
//app.use(helmet()); only use when api calls and use in route files

//following middleware will use when external resource will use in our app
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//config passport for auth
app.use(session({
   secret: 'Express is my fav', 
   resave: false, 
   saveUninitialized: true,
   cookie:{secure:false}  //if trure it will not return session data
  }));
  
app.use(passport.initialize());
app.use(passport.session());

var socialConfig=require('./config/config.js').socialConfig; //load configurations from config

//passport strategy for github
passport.use(new GitHubStrategy(socialConfig.github,
function(accessToken, refreshToken, profile, cb) {
    //console.log(profile._json);
    //return cb(null, profile._json);
    return cb(null, profile);
  }
));

//passport strategy for facebook
passport.use(new FacebookStrategy(socialConfig.facebook,
  function(accessToken, refreshToken, profile, cb) {
      //console.log(profile._json);
      //return cb(null, profile._json);
      return cb(null, profile);
    }
  ));

  //passport strategy for google
passport.use(new GoogleStrategy(socialConfig.google,
  function(accessToken, refreshToken, profile, cb) {
      //console.log(profile._json);
      //return cb(null, profile._json);
      return cb(null, profile);
    }
  ));

  //passport strategy for linkedin
passport.use(new LinkedInStrategy(socialConfig.linkedin,
  function(accessToken, refreshToken, profile, cb) {
      //console.log(profile._json);
      //return cb(null, profile._json);
      return cb(null, profile);
    }
  ));

passport.serializeUser((user,cb)=>{
  cb(null,user);
});

passport.deserializeUser((user,cb)=>{
  cb(null,user);
});


//end passport config

//load app routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employee', employeeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
