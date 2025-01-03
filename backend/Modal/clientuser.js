import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact_number: {
        type: Number,
        required: true,
    },
});

export default  mongoose.model("clientuser", clientSchema);