import express from "express";
import routes from "./src/routes/route";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./src/models/userModel";
import jwt from "jsonwebtoken";
const app = express();


mongoose.Promise= global.Promise;
mongoose.connect("mongodb://localhost/apidb");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//jwt setup

app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
       jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
           if (err) req.user = undefined;
           req.user = decode;
           next();
       }); 
    } else {
        req.user = undefined;
        next();
    }
});


routes(app);

app.route("/",(req,res)=>{
	res.send("Started");
});
app.listen(3000,()=>{
	console.log("Started on 3000");
});


