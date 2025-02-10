import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requered: [true, "Provide name"]
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide password"]
    }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;