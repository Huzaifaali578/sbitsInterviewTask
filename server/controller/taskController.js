import taskModel from "../model/taskModel.js";


// create Task
export async function createTask(req, res) {
    try {
        const { taskName, taskDate, taskDetails } = req.body;
        console.log(taskName, taskDate, taskDetails)
        const newTask = new taskModel({ userId: req.userId, taskName, taskDate, taskDetails });
        await newTask.save();
        return res.status(201).json({
            message: "Task added",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
};

// Get task
export async function getTask(req, res) {
    try {
        const tasks = await taskModel.find({ userId: req.userId });
        // console.log(tasks)
        res.status(200).json({
            data: tasks,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
};

// Update Task
export async function updateTask(req, res) {
    try {
        console.log("req.params.id", req.param)
        const taskUpdate = await taskModel.findByIdAndUpdate(req.params.id, req.body);
        if (!taskUpdate) {
            return res.status(404).json({
                message: "Task not found",
                success: false
            });
        }
        res.status(201).json({
            message: "Task Updated",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
};

// dalete task
export async function daleteTask(req, res) {
    try {
        const taskDelete = await taskModel.findByIdAndDelete(req.params.id);
        console.log("taskDelete", taskDelete)
        if (!taskDelete) {
            return res.status(404).json({
                message: "Task not found. Can not delete",
                success: false
            });
        }
        res.status(200).json({
            message: "Task Deleted",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false
        })
    }
}