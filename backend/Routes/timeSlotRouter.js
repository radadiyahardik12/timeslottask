import express from "express";
import { auth } from "../Middlewere/auth.js";
import { createTimeslot, deleteTimeslot, getSubTimeslots, getTimeslots, timeslotEdit } from "../Controller/timesloteController.js";

const route = express.Router();

route.post('/create',auth, createTimeslot);
route.post('/timeslots',auth, getTimeslots);
route.post('/timeslotsDelete',auth, deleteTimeslot);
route.post('/timeslotEdit',auth, timeslotEdit);
route.post('/getSubTimeslots',auth, getSubTimeslots);

export default route;