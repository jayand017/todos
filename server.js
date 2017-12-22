var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("todo", ["todo"]);
var bodyParser = require("body-parser");

// app.get('/', function(req, res){
// 	res.send("Hello World! from server.js");
// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/list", function(req, res){
	console.log("I received the GET request");
	//sent dummy data from server to controller
	//var list = [{item: "I love eating"},{item: "I love eating again"}];
	//res.json(list);

	//fetch data from mongoDB to controller
	db.todo.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
	
});

app.post("/list", function(req, res){
	console.log(req.body);
	db.todo.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete("/list/:id", function(req, res){
	var id = req.params.id;
	console.log("Requested to delete: " + id);
	db.todo.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get("/list/:id", function(req, res){
	var id = req.params.id;
	console.log("Request to edit: " + id);
	db.todo.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put("/list/:id", function(req, res){
	var id = req.params.id;
	console.log("Request to update: " + id);
	console.log(req.body);
	db.todo.findAndModify({query: {_id: mongojs.ObjectId(id)},
						   update: {$set: {item: req.body.item}},
						   new: true}, function(err, doc){
						   		res.json(doc);
						   }); 
});

app.listen(3000, function(){ console.log("Server running on port: 3000"); });