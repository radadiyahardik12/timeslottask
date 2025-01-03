import mongoose from "mongoose";

const maintimesSchema = mongoose.Schema({
  date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  Times: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timeslot' }],
});

export default  mongoose.model("MainTimes", maintimesSchema);