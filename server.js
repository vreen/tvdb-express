// base setup
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var tvdbc 		 = require('hpv-tvdb'); //https://www.npmjs.org/package/hpv-tvdb

// set the tvdb api key
var apikey = "yourkey";

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

var port = process.env.PORT || 8080; 		// set our port

// routes
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	next(); // make sure we go to the next routes and don't stop here
});

router.route('/shows')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
    client = new tvdbc.TvDbClient(apikey),
    callback = function(err, result) {
        res.send(result);
	    };
		var query = req.body.query;  // set the shows name (comes from the request)
		client.getSeriesByTitle(query, callback);
	});

router.route('/shows/:showId')
	.get(function(req,res) {
		client = new tvdbc.TvDbClient(apikey),
    callback = function(err, result) {
        res.send(result);
	    };
		client.getSeasonsBySeriesId(req.params.showId, callback);
	});

// all routes will be prefixed with /api
app.use('/api', router);

// start server
// =============================================================================
app.listen(port);
console.log('tvdb api running on port ' + port);