import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

import {body,validationResult} from'express-validator';
const router = express.Router();

router.post('/register',[
    body('email').isEmail(),
    body('password').isLength({min:8})
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
        const {email,password}=req.body;

        try{
            const existingUser=await User.findOne({email});
            if(existingUser) return res.status(400).json({msg:'Email already exists'});
            const user=new User({email,password});
            await user.save();
            res.status(201).json({message:"User Registered Successfully"});

        }catch(error){
            res.status(500).json({message:"Error Registering User",error});
        }
}
);
//Login Route

  router.post('/login',async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid email or password"});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid email or password"});

        const token=jwt.sign({userId:user._id},"your_jwt_secret",{expiresIn:'1h'});
        res.json({token});
    } catch(error){
          res.status(500).json({message:'Error logging in',error});
    }
  });

  export default router;