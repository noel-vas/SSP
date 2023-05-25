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

route.post('/dataEntry', async (req, res) => {
  console.log(req.body);

  const id = req.session.user_id;
  console.log(id);
  console.log(req.session.id)

  const { name, store, order, quantity, description, price } = req.body;
  const data = new models.user({
    name: name,
    store: store,
    order: order,
    quantity: quantity,
    description: description,
    price: price,
    user_Id:new mongoose.Types.ObjectId(id)
  });

  try {
    const savedData = await data.save();
    res.status(200).json(savedData); // Return the saved data if needed
  } catch (error) {
    console.error(error);
    //res.status(500).json({ error: 'Error saving data' });
  }
});


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



route.post('/login', async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  const saltRounds = 10;
  const user = await models.signin.findOne({ email });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
     console.log(user._id)
      req.session.user_id = user._id;
     console.log(req.session.user_id)
      
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});

  

route.get('/orders',async (req, res) => {
  try {
    const id = req.session.user_id;
    console.log(id);
    const orders = await models.user.find({ user_Id: id })
    console.log(orders)
  
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error finding orders' });
  }
});

route.get('/coordinates', async (req, res) => {
  try {
    const id = req.session.user_id;
    console.log('Coordiantes');
    console.log(req.session.user_id);
    // Call findById with the ID directly, not as a property of an object
    const orders = await models.map.find({reference:new mongoose.Types.ObjectId(id)});
    console.log(orders);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error finding coordinates' });
  }
});




