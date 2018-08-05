import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const userSchema = new Schema({
	username:{
		type:String,
		required:true
	},
	email:{
		type:String,
	},
	hashPassword:{
		type:String,
		required:true
	}
});


userSchema.methods.comparePassword=(password,hashPassword)=>{
	return bcrypt.compareSync(password,hashPassword);
};