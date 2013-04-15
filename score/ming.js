// Express initialization
var express = require('express');
var app = express(express.logger());
app.use(express.bodyParser());
app.set('title', 'nodeapp');

app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
});

// Mongo initialization
var mongoUri = 'mongodb://zeus:lightning@dharma.mongohq.com:10037/scorecenter';
var mongo = require('mongodb')
var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
	if(error) { return console.dir(error)};
	db = databaseConnection;
	collection = db.collection('highscores');
});
	

app.get('/', function (request, response) {
	
	var doc1 = {'car':'Snarf Snarf'};
		
	
	collection.insert(doc1, {w:1}, function(err,result){});
	
	
	response.set('Content-Type', 'text/html');
	response.send('<h1>Why hello!</h1>');
});


app.get('/stuff', function(request,response) {
	
	var the_stuff;
	console.log("hello");
	
	var tha_name = request.query.name;
	var tha_age = request.query.age;
	
	console.log("name: " + tha_name);
	console.log("age: "+ tha_age);
	
	/*	
	collection.find().toArray(function(err,items){
		the_stuff = items;
		console.log(the_stuff);
		items.forEach(function(thing){
			response.send('<h2>sup</h2>');
			console.log(thing);
		});
	});
	*/	

	//collection.insert(doc1, {w:1}, function(err,result){});
	
	
	response.set('Content-Type', 'text/html');
	var test = '{"status":"really shitty"}';
	//response.send(the_stuff);
	//response.send('{"status":"good"}');
	response.send(test);
	
});


// Oh joy! http://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
app.listen(process.env.PORT || 3000);