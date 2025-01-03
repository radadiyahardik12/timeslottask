import express from "express";
import { clientBookingCancel, createBooking, getClientBookings, updateClientBookings } from "../Controller/bookingController.js";
import { auth } from "../Middlewere/auth.js";

const route = express.Router();

route.post('/booking', auth, createBooking);
route.post('/bookings/email', auth, getClientBookings);
route.post('/bookings/cancel',auth, clientBookingCancel);
route.post('/bookings/update',auth, updateClientBookings);

export default route;