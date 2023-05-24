const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const user = require('./models/users');

const authroutes= require('./routes/authroutes')

app.use(authroutes); 
mongoose.connect('mongodb://localhost:27017/minorproject')
    .then(()=>{
        console.log('database connected');
    })
    .catch(err=>{
        console.log(err);
    })

    app.get('/',(req,res)=>
    {
        
    })


app.listen(19001,'192.168.20.85',()=>{
    console.log('server running')
})