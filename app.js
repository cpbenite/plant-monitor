var express		= require('express'),
	app			= express();

app.set('port', (process.env.PORT || 3000));

app.get('/', (req, res) => {
	res.send('I am loading the home page');
});

app.listen(app.get('port'), () => console.log('Listening on port ' + app.get('port')));

