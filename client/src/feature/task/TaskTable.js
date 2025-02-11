import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "../../Redux/actions/taskActions";

function TaskTable({ setIsActive, setIsEdit, setData }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.taskList || []);

  const handleDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      dispatch(fetchTasks()); 
    });
  };

  const handleEdit = (task) => {
    setData(task); 
    setIsEdit(true); 
    setIsActive(true); 
  };

  const taskArray = tasks?.data ?? tasks;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="max-w-4xl w-full mx-auto mt-5 p-6 bg-yellow-500 rounded-lg shadow-lg">
      <h1 className="text-center text-3xl font-semibold mb-4">Tasks</h1>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="p-3">Task Name</th>
            <th className="p-3">Date</th>
            <th className="p-3">Task Details</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskArray.length > 0 ? (
            taskArray.map((task, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{task.taskName}</td>
                <td className="p-3">{task.taskDate}</td>
                <td className="p-3">{task.taskDetails}</td>
                <td className="p-3 text-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-600">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
