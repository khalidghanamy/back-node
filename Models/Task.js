import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Todo", "InProgress", "UnderReview", "Rework", "Completed"],
        default: "Todo"
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"

    }
    ,
    startedAt: {
        type: String,
        default: "30/6/2022"
    }
    ,
    finishedAt: {
        type: String,
        default: "1/7/2022"
    }
}
);
const Task = mongoose.model("Task", taskSchema);
export default Task;