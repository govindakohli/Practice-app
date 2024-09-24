import express from "express"
import {create, deleteuser, getAll, getOne, update , login , logoutUser } from "../controller/userController.js"
import {isUserAuthenticated} from "../middleware/auth.js"
 
const route = express.Router()

// route.post("/User/registered", patientRegister)
route.post("/create" , create)
route.post("/login",login)
route.get("/user/logout", isUserAuthenticated , logoutUser)
route.get("/getall", isUserAuthenticated, getAll)
route.get("/getOne/:id" , getOne)
route.put("/update/:id" , update)
route.delete("/delete/:id" , deleteuser)



export default route