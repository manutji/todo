var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var morgan = require('morgan');
var mongoose = require('mongoose');

//database
mongoose.connect('mongodb://localhost/todotodo');
var TodoSchema = new mongoose.Schema({
  name: String,
  done : Boolean
  });
var Todo = mongoose.model('Todo', TodoSchema);

var todo = new Todo({
	name : String,
	done : 'true'

});


// var db = Todo;

app.use(morgan('dev')); // logging

// receiving data from FROM and AJAX
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data


// home
app.get('/', function(req, res){
	res.redirect('/index.html');


	Todo.find(function (err, data) {
	  if (err) return console.error(err);
	  // console.log(data)
	});
	// res.send('<h1>hello world</h1>');
});

// create
app.post('/todo', function(req, res){
	// todo.push(req.body);
	// res.redirect('/index.html');
	console.log('------------TODO------------');
	todo.name = req.body.title;
	res.json(todo.name);

	// console.log(req.body);
	todo.save(function (err, datatodo) {
		if (err) console.log(err);
		else console.log('Saved : ', datatodo);
	});

});

// delete
app.post('/delete', function(req, res){
	console.log('------------DELETE------------');
	 Todo.remove({
            _id: req.body._id
        }, function(err, todo) {
            if (err)
                res.send(err);

            console.log('DELETE SUCCESS');
        });

});

// toggle done status
app.post('/toggle', function(req, res){

	var id = req.body._id;

	console.log(id);
	// if(id < 0){
	// 	return false;
	// 	res.json(false);
	// }

	Todo.findOne({_id: id}, function(err, todo){
		if(todo.done==true){
			todo.done = false;
		}
		else{
			todo.done = true;
		}
		
		todo.save(function(){
			res.json(todo);
		})
	});


})

// list task
app.get('/todo.json', function(req, res){
	Todo.find(function (err, data) {
	  if (err) return console.error(err);
	  // console.log(data);
	  res.json(data);
	});


});

// get static files
app.use(express.static('publics'));

var port = 3000;
var server = app.listen(port, function(){
	console.log('http://localhost:' + port);
});