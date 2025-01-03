import mongoose from "mongoose";

const timeslotSchema = mongoose.Schema({
  date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  status: { type: Boolean, default: true },
  max_bookings: { type: Number, required: true },
  booked : { type: Number, default: 0 },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
});

export default  mongoose.model("Timeslot", timeslotSchema);