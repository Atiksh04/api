import {addnewContact,findDetails,removebyId} from "../controllers/controller";
import {register,login,loginRequired} from "../controllers/userController";
const routes =(app)=>{

	app.route("/contact")
		.get(loginRequired,findDetails)
		.post(loginRequired,addnewContact);
		

	app.route("/contact/:contactId")
		.delete(loginRequired,removebyId);

	app.route("/kalash/register")
		.post(register);

	app.route("/kalash/login")
		.post(login);
};

export default routes;



