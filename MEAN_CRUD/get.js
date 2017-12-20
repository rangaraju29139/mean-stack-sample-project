var express = require('express');
var mongodb = require('mongodb');
var bodyParser=require('body-Parser')
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/EmpDB';
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

//Enabling CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


MongoClient.connect("mongodb://localhost:27017/TempDB",function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } 
  else {
   
    console.log('Connection established');

    // Get the documents collection
    var collection = db.collection('Temp');
	
	//app.get('*/',function(req,res)
	//{
	//res.sendFile(__dirname+""+'/retrieve.html')
	//})
//insert api
  app.post('/getexample', function (req, res) {
// Prepare output in JSON form at

var name=req.body.name
var empid=req.body.empid
var email=req.body.email
var salary=req.body.salary
var docid=req.body.email

console.log(docid+""+name +""+ empid +""+ email +""+ salary);
collection.insert({"_id":docid,"Name":name,"empid":empid,"email":email,"salary":salary}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Inserted")
		res.send("Inserted")
      }
      //Close connection
	  })

})

app.post('/login',function(req,res)
{
	var Email=req.body.Email;
	var Password=req.body.Password;
	MongoClient.connect(url, function (err, db){
	if(err)
	{
		console.log("Failed to Connect");
	}
	else
	{
		console.log('Connected Successfully');
		//var collection = db.collection('Registration');
		 db.collection("Registration").find({Email:Email,Password:Password}).toArray(function(err, result) {
			 console.log(JSON.stringify(result));
    if (err) 
		res.send("no Data");
	/* else if(result.length==0){
			res.send("no Data");
			console.log('no data');
	} */
	else
    res.send(result);
	db.close();
    });
  }
  });
});
app.post('/signUp',function(req,res)

{
	
	var fName=req.body.FirstName;
	var mName=req.body.MiddleName;
	var lName=req.body.LastName;
	var Email=req.body.Email;
	var Password=req.body.Password;
	var PhoneNumber=req.body.PhoneNumber;
	var user={FirstName:fName,MiddleName:mName,LastName:lName,Email:Email,Password:Password,PhoneNumber:PhoneNumber}

	MongoClient.connect(url, function (err, db){
	if(err)
	{
		console.log("Failed to Connect");
	}
	else
	{
		console.log('Connected Successfully');
		var collection1 = db.collection('Registration');
		collection1.insert([user], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted details into the "Registration" collection');
		res.send(result);
	   //alert('Successfully Registered');
      }
      //Close connection
      db.close();
    });
  }
});
	
	
});

app.post('/delete', function(req,res)
{
	var email=req.body.email;
	console.log(email)
	collection.remove({"email":email},function(err,result)
		{
			if(err)
			{
				res.send("failed");
		}
		else
		{
		var result={
		"output":result
		}
res.json(result);
console.log(result)	
		}
})
})
//retrive api

 app.post('/retrieve', function (req, res) {
// Prepare output in JSON form at
console.log(req.body);
var email=req.body.email;

console.log(email)
collection.find({"email":email}).toArray(function(err,result)
{
if(err)
{
res.send("Failed");
}
else
{
var result={
		"output":result
		}
res.json(result);
console.log(result)
}
})
})

//closing db
 app.post('/update', function (req, res) {
// Prepare output in JSON form at

var email=req.body.email;
var Name=req.body.Name;
var empid=req.body.empid;
var salary=req.body.salary;

console.log(email)
///collection.find({"id":id}).toArray(function(err,result){
	
		collection.update({"email":email},{$set:{"Name":Name,"empid":empid,"salary":salary}},function(err,result)
{
if(err)
{
	var error={
		"output":"not updated"
	}
	
res.json(error);
}
else
{
	var response=
	{
		"output":result
		}
res.send(response);
console.log(result)
}
})

})
}
});
app.listen(8000, function () {

console.log("app listening on 8000")
})
