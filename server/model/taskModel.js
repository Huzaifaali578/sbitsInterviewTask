import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    taskName: String,
    taskDate: String,
    taskDetails: String
});

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;