import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {userSchema} from "../models/userModel.js";


const User = mongoose.model("USER",userSchema);

export const register =(req,res)=>{
	const newUser= new User(req.body);
	newUser.hashPassword=bcrypt.hashSync(req.body.password,10);
	newUser.save((err,done)=>{
		if (err) res.send(err);
		else{
			newUser.hashPassword=undefined;
			res.json(done);
		}
	});
};

export const login =(req,res)=>{
	User.findOne({email:req.body.email},(err,user)=>{
		if(err) res.send(err);
		if(!user) res.json({message:"User not found"});
		else if(user){
			if(!user.comparePassword(req.body.password,user.hashPassword))
				 res.json({message:"Authentication failed wrong password"});
			else {
			res.json({token:jwt.sign({email:user.email,username:user.username,_id:user.id},'RESTFULAPIs')});
			}
		}		
	});
}
//controller below will check each time is the user reistered or not.
export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!'});
    }
}