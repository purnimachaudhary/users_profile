const express = require('express');
const bodyParser = require('body-parser');
const bc = require('bcryptjs');

const dbase = require('./dbase');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('This is main page');
});

app.post('/register',(req,res)=>{
    let name = req.body.name;
    let username = req.body.username;
    let password = bc.hashSync(req.body.password,10);
    dbase.users.putInfo(name,username,password,(err,result)=>{
        if(err){
            console.log(err);
        }else {
            res.send(result);
        }
    });
});

app.get('/users',(req,res)=>{
    dbase.users.getInfo((err,result)=>{
        res.send(result);
    });
});



app.listen(process.env.PORT || 9909,()=>{
    console.log("App listening on port 9909");
});