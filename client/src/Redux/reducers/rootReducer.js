import { combineReducers } from "redux";
import { authReducer } from "./authReducer ";
import { taskReducer } from "./taskReducer";

export const rootReducer = combineReducers({
    tasks: taskReducer,
    auth: authReducer,
});
