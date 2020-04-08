var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/ay',{ useNewUrlParser: true },(err)=>{
	if(!err){
		console.log("connection succeeded");
	}else{
		console.log("connection error: " + err);
	}
});

var registerSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	emailId:String,
	collegeName: String,
	eventName: String,
	created:{type: Date,default: Date.now}
});

var Register = mongoose.model("Register",registerSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(req,res)=>{
	res.render("root");
});

app.get("/gallery",(req,res)=>{
	res.render("gallery"); 
});

app.get("/events",(req,res)=>{
	res.render("events");
});

app.get("/register",(req,res)=>{
	res.render("register");
});

app.post("/participants",(req,res)=>{
	//alert("Registration successful!! find your name in the participants list");
	var firstName = req.body.fname;
	var lastName = req.body.lname;
	var emailId = req.body.email;
	var collegeName = req.body.clg;
	var eventName = req.body.event;
	var participant = {
		firstName : firstName,
		lastName : lastName,
		emailId : emailId,
		collegeName : collegeName,
		eventName : eventName
	};
	Register.create(participant);
	res.redirect("/about");
});

app.get("/about",(req,res)=>{
	Register.find({}).then(registers =>{
		res.render("about",{registers : registers});
	}).catch(err=>{
		console.log(err);
	});	
});

app.listen(4000,()=>{
	console.log("server running");
});