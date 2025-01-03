import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
        client_name: { type: String, required: true },
        email: { type: String, required: true },
        contact_number: { type: String, required: true },
        timeslot: { type: mongoose.Schema.Types.ObjectId, ref: 'Timeslot', required: true },
        booking_time: { type: Date, default: Date.now },
      });

export default  mongoose.model("Booking", bookingSchema);