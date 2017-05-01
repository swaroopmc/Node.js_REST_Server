var express = require('express');
var path = require('path');
var crypto = require('crypto');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var app = express();
var mongoOp =require("./model/mongo");



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.get("/contacts/:id", function(req,res){
        var response = {};
        //var _id = req.params.id;
        mongoOp.findOne({'cid':req.params.id},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }

            var contacts = [];
            contacts.push(data);  
            var result= {"contacts":contacts} 
            res.send(JSON.stringify(result));
        });
    });




app.get("/contacts", function(req,res){
        var response = {};
        if(!req.param('q')){
        mongoOp.find({},function(err,data){
    
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
      }

      else if(req.param('q') && !req.param('user')){


var u = req.param('q');
       console.log(u);
        mongoOp.find({'name.last': u },function(err,data){
        
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
   

      } 
      else{
        var user = req.param('user');
        var u = req.param('q');

        console.log(user+"is ");
         mongoOp.find({'name.last': u },{cid: new RegExp(user+'$', "i")},function(err,data){
          console.log(data);
        
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });  
      }
    });




app.post("/contacts/import",function(req,res){
        var db = new mongoOp();
        var response = {};
        //var user = req.param('user');
        db.name.first = req.body.name.first;
        db.name.last = req.body.name.last;
        db.title = req.body.title;
        db.emails = req.body.emails; 
        console.log(db.emails);
       //db.cid = user+crypto.createHash('md5').update(db.name.last).digest('hex'); 

        db.save(function(err){
        
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });




app.delete("/contacts/:id", function(req,res){
  var response ={};
  mongoOp.findByIdAndRemove({'_id':req.params.id}, function (err, data) {  
    
    response = {
        message: "successfully deleted",
      
    };
    res.send(response);
});
});


app.put("/contacts/:id/merge/:id2", function(req,res){

function retrieveContact(uname, callback) {
  mongoOp.find({'_id': uname}, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data[0]);
    }
  });
};


retrieveContact(req.params.id, function(err, data) {
  if (err) {
    console.log(err);
  }



mongoOp.findById({'_id':req.params.id2}, function (err, data1) {  
  if (err) {  
        res.status(500).send(err);
    }else{
    
 data1.name.last = data1.name.last + " ," + data.name.last;
      data1.name.first = data1.name.first + " ," + data.name.first;
   data1.title = data1.title + " ," + data.title;
   var t = data1.emails;
    data1.emails = t.concat([data.emails]);


 // Save the updated document back to the database
        data1.save(function (err, data) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(data);
   });
  
}

        }); //mongoO


});

 
    }); // app



app.listen(3000);
console.log("the server is runnning");


module.exports = app;
