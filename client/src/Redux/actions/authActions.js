import { LOGIN_SUCCESS, LOGOUT } from "./types.js";

export const loginUser = (credentials) => async (dispatch) => {
    try {
        console.log(credentials)
        const url = "http://localhost:8000/api/signin";
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            credentials: "include",
        });

        const data = await response.json();
        console.log(data)

        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        console.error("Login failed:", error);
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8000/api/signout", {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Logout failed: ${response.statusText}`);
        }

        dispatch({ type: LOGOUT });
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
