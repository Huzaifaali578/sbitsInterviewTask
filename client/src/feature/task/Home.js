import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, fetchTasks, updateTaskedit } from "../../Redux/actions/taskActions";
import toast from "react-hot-toast";
import TaskTable from "./TaskTable";
import { logoutUser } from "../../Redux/actions/authActions";

function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const taskCreated = useSelector((state) => state.tasks.createtask);

  const [data, setData] = useState({
    taskName: "",
    taskDate: "",
    taskDetails: "",
    _id: null,
  });

  useEffect(() => {
    if (taskCreated?.success) {
      toast.success(taskCreated?.message);
      dispatch(fetchTasks());
      handleClose();
    } else if (taskCreated?.message) {
      toast.error(taskCreated?.message);
    }
  }, [taskCreated, dispatch]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      console.log("Update Task:", data);
      dispatch(updateTaskedit(data._id, data))
    } else {
      dispatch(createTask(data));
    }

    setIsActive(false);
    setIsEdit(false);
    setData({ taskName: "", taskDate: "", taskDetails: "", _id: null });
  };

  dispatch(fetchTasks());
  const handleClose = () => {
    setIsActive(false);
    setIsEdit(false);
    setData({ taskName: "", taskDate: "", taskDetails: "", _id: null });
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, handleSubmit]);

  return (
    <>
      <div className="max-w-full w-full mx-auto">
        <div className="flex justify-between">
          <button
            className="w-96 bg-green-400 p-4 m-4 rounded-lg text-3xl font-medium hover:bg-green-500"
            onClick={() => {
              setIsActive(true);
              setIsEdit(false);
              setData({ taskName: "", taskDate: "", taskDetails: "", _id: null }); // Reset form
            }}
          >
            Create Task
          </button>
          <button
            className="w-96 bg-green-400 p-4 m-4 rounded-lg text-3xl font-medium hover:bg-green-500"
            onClick={() => {
              dispatch(logoutUser())
            }}
          >
            Log Out
          </button>
        </div>

        {/* Task Popup */}
        {isActive && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="w-[500px] bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-center text-3xl font-bold p-4">
                {isEdit ? "Edit Task" : "Enter Task"}
              </h1>
              <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="taskName" className="font-medium">
                    Task:
                  </label>
                  <input
                    type="text"
                    id="taskName"
                    name="taskName"
                    placeholder="Enter Your Task"
                    className="px-3 py-2 bg-gray-100 focus:outline-primary rounded-md"
                    value={data.taskName}
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="taskDate" className="font-medium">
                    Date:
                  </label>
                  <input
                    type="date"
                    id="taskDate"
                    name="taskDate"
                    className="px-3 py-2 bg-gray-100 focus:outline-primary rounded-md"
                    value={data.taskDate}
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="taskDetails" className="font-medium">
                    Task Details:
                  </label>
                  <textarea
                    id="taskDetails"
                    name="taskDetails"
                    placeholder="Enter Your Task Details"
                    className="px-3 py-2 bg-gray-100 focus:outline-primary rounded-md"
                    value={data.taskDetails}
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="bg-green-400 px-4 py-2 text-lg font-bold hover:bg-green-600 rounded text-white"
                  >
                    {isEdit ? "Update Task" : "Add Task"}
                  </button>
                  <button
                    type="button"
                    className="bg-red-400 px-4 py-2 text-lg font-bold hover:bg-red-600 rounded text-white"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <TaskTable setIsActive={setIsActive} setIsEdit={setIsEdit} setData={setData} />
    </>
  );
}

export default Home;
