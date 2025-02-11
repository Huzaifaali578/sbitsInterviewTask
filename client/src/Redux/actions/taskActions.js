// import axios from "axios";
import { data } from "react-router-dom";
import { UPDATE_TASK, CREATE_TASK, DELETE_TASK, SET_TASKS } from "./types";

export const fetchTasks = () => async (dispatch) => {
    try {
        const url = "http://localhost:8000/api/";
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Declare data properly
        console.log("Fetched Tasks:", data);

        dispatch({ type: SET_TASKS, payload: data.data });
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
    }
};

export const createTask = (task) => async (dispatch) => {
    try {
        const url = "http://localhost:8000/api/create";
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
            credentials: "include",
        });

        const data = await response.json()
        console.log(data)
        dispatch({ type: CREATE_TASK, payload: data });
    } catch (error) {
        console.error("Error adding task", error);
    }
};

export const updateTaskedit = (taskId, updatedTask) => async (dispatch) => {
    try {
        const url = `http://localhost:8000/api/update/${taskId}`;

        const response = await fetch(url, {
            method: "PUT", // Use PUT for updating
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to update task");
        }

        const data = await response.json(); 

        dispatch({ type: UPDATE_TASK, payload: data }); 
    } catch (error) {
        console.error("Error updating task", error);
    }
};

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        const url = `http://localhost:8000/api/delete/${taskId}`;
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        dispatch({ type: DELETE_TASK, payload: taskId });
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};
