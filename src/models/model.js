import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const userSchema=new Schema({
	firstName:String,
	

	lastName:String,
	
	email:String,
	
	creation_date:{type:String,
		default:Date.now}
});

