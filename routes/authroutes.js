const express = require('express');
const route= express.Router();
 const models = require('../models/users')
 const bodyParser = require('body-parser');
 const bcrypt = require('bcrypt');
 const mongoose=require('mongoose')
 const session = require('express-session')
route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());
route.use(session({secret:'not a good secret',
resave:false,
saveUninitialized: true}));



module.exports=route;   

const requireLogin=(req,res,next)=>{
  if(!req.session.user_id){
    next();
    res.redirect('/login')
   
  }
}
route.post('/logout',(req,res)=>{
  req.session.user_id=null;
  res.redirect('/login')
})

route.post('/dataEntry',requireLogin,async (req,res)=>{
  
  console.log(req.session.user_id)
    const id = req.session.user_id;
  
    const {name,store,order,quantity}=req.body;
    const data = new models.user({name:name,store:store,order:order,quantity:quantity,user_Id:id})
    await data.save();
   
  
   
})
route.get('/dataEntry',requireLogin,async (req,res)=>{
  if(req.session.user_id)
   {
    console.log(req.session.user_id)
  //   if(!req.body.user_Id){

  //     req.body.user_Id= id;
  //     data.user_Id=id;
   
  // }

   }
   })
route.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new models.signin({
      email: email,
      password: hashedPassword
    });

   
    const savedUser = await user.save();
    req.session.user_id=user._id;

   res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error signing up' +error});
  }
});

route.get('/secretlist',async (req,res)=>{
  // if(req.session.user_id)
  // {
  //   const id = req.session.user_id;
  //   let list=[];
  //   list = await models.user.find({author:id}).exec();
  //   res.send(list);

  //  }
  
  
})

route.post('/login',async (req,res)=>{
const { email,password } =req.body;

  const saltRounds=10;
  const user = await models.signin.findOne({email})
  if(user)
  {
 
  
  const validpassword= await bcrypt.compare(password,user.password);
  if(validpassword){
    req.session.user_id=user._id;
    res.send("Logged in by "+req.session.user_id)

  }
  else{
    res.send("error pw try again")
  }

  }
})

  

route.get('/orders/:user_id', requireLogin,async (req, res) => {
  try {
    const orders = await models.user.find({ user_Id: req.params.user_id })
      .populate('user_Id', 'name email') // populate the referenced document with 'name' and 'email' fields
      .exec();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error finding orders' });
  }
});



