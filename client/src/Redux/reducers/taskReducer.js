import { CREATE_TASK, UPDATE_TASK, DELETE_TASK, SET_TASKS } from "../actions/types";

const initialState = {
    createtask: null,
    taskList: [],
};

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return { ...state, taskList: action.payload };
        case CREATE_TASK:
            return { ...state, createtask: [...state.taskList, action.payload] };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload._id ? action.payload : task
                ),
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
            };
        default:
            return state;
    }
};
