const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// If port not given from a web app/server (like Heroku), use port 3000
app.set('port', (process.env.PORT) || 3000);

// Tell the app that jinja2 templating is used
app.set('view engine', 'ejs');

// Specify location of asset / static files
app.use(express.static(__dirname + '/assets'));

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Retrieve routes
var indexRoutes = require('./routes/index'),
    apiRoutes   = require('./routes/api');

/*******      ROUTES          *****/
app.use('/', indexRoutes);
app.use('/api', apiRoutes);
app.use('/home', require('./routes/home.js'));
app.use('/users', require('./routes/users.js'));


// Turn on app & print "Listening on port ___"
app.listen(app.get('port'), () => console.log('Listening on port ' + app.get('port')));
