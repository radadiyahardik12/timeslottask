import express from "express";
import { adminLogin, createadmin } from "../Controller/adminController.js";

const route = express.Router();

route.post('/createadmins', createadmin);
route.post('/adminlogin', adminLogin);

export default route;