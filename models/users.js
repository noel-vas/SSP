const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        store:String,
       
        arrtime:{
            type:Date,
            default:Date.now
        },
        order:String,
        DOD:{
            type:Date,
            default:() => {
                const now = new Date();
                now.setDate(now.getDate() + 10);
                return now;
              }
        },
        presentDay:{
            type:String,
            default:()=>{
                const date = new Date();
                const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const dayOfWeekName = weekdays[date.getDay()];
                return dayOfWeekName;
            }
        },
        description:String,
        price:Number,
        quantity:Number,
        user_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'signups' }
  
    })
  
    const maps= new mongoose.Schema({
        Location:[String],
        coordinates: [{
            longitude: {
              type: Number,
              required: true
            },
            latitude: {
              type: Number,
              required: true
            }
          }],
       // user_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'signin' }
    })
    
    
        const map = mongoose.model('maps',maps);    
    
        

    
   const signup= new mongoose.Schema({
    email: String,
  
    password:String
       
        
    
   })

   const signin=mongoose.model('signup',signup);

    const user =mongoose.model('user',userSchema);
   
    module.exports={
        signin:signin,
        user:user,
        map:map
    };
    
