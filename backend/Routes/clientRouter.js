import express from "express";
import { clientLogin, createClient } from "../Controller/clientController.js";

const route = express.Router();

route.post('/createclient', createClient);
route.post('/clientlogin', clientLogin);

export default route;