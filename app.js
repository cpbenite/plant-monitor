// Use Express library
// App will use express library
var express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express();

// Retrieve routes
var indexRoutes = require('./routes/index'),
    apiRoutes   = require('./routes/api');

// If port not given from a web app/server (like Heroku), use port 3000
app.set('port', (process.env.PORT) || 3000);

// Tell the app that jinja2 templating is used
app.set('view engine', 'ejs');

// Specify location of asset / static files
app.use(express.static(__dirname + '/assets'));

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*******      ROUTES          *****/
app.use('/', indexRoutes);
app.use('/api', apiRoutes);


// Turn on app & print "Listening on port ___"
app.listen(app.get('port'), () => console.log('Listening on port ' + app.get('port')));
