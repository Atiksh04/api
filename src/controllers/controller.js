import mongoose from "mongoose";
import {userSchema} from "../models/model";

const Contact = mongoose.model('contactDetails',userSchema);
export const addnewContact=(req,res)=>{
	let newContact = new Contact(req.body);
	newContact.save((err,contact)=>{
		if(err) res.send(err);

		res.json(contact);
	});
};


export const findDetails=(req,res)=>{
	Contact.find({},(err,details)=>{
		if(err){
			res.send(err);
		}

		res.json(details);
	})
};


export const removebyId=(req,res)=>{
	Contact.remove({_id:req.params.contactId},(err,details)=>{
		if (err) {res.send(err)}
			res.send(`removed`);
	})

};
