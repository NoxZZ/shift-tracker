const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userInfo =require('./models/userInfo');
const fs = require('fs');
const hbr = require('express-handlebars');

app.use(express.static('../shift-tracker'));

//including handlebars
app.set('views',path.join(__dirname,'/views'));
app.engine('handlebars',hbr({defaultLayout:'main'}));
app.set('view engine','handlebars'); 
//including bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//connecting to Mongodb 
mongoose.connect('mongodb://127.0.0.1:27017/ShiftTracker',{useNewUrlParser:true});
var db = mongoose.connection;
console.log('connected to database sucessfully !');
//handling connection error 
db.on('error',console.error.bind(console,'Mongodb connection error'));

app.get('/',function(req,res){
    console.log('requested on '+ req.url);
    res.render('index',{title:'SHIFT-TRACKER'});
});

//serving the get data file
app.get('/add_user',function(req,res){
    console.log('requested on '+ req.url);
    res.render('add_user',{title:'add user'});
}); 

//this part  will store the data taken from user :
app.post('/add_user',function(req,res){
    var item = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        EmpId : req.body.EmpId
    }
    console.log('requested on '+ req.url);
    var userData = new userInfo(item);
    userData.save().then(function(item){
        console.log(item);
        console.log('data saved !');
    }).catch(function(err){
        console.log({error:err.message});
    });
    res.redirect('/');
});
//retrieving the data back from the database :
app.get('/get_data',function(req,res){
    console.log('requested on '+ req.url);
    userInfo.find(function(err,docs){
        if(err){
           return  res.send(err);
            console.log(err);
        }
         res.render('get_data',{title:'workin',userInfo:docs});   
    });
}); 

//listening to the server 
app.listen(8000);
console.log('server started on  port 8000...');