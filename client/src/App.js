import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import SignUp from "./feature/auth/SignUp";
import SignIn from "./feature/auth/SignIn";
import Home from "./feature/task/Home";
import { fetchTasks } from "./Redux/actions/taskActions";
import ProtectedRoute from "./feature/commen/PrivateRoute"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks()); // Fetch tasks after login
  }, [dispatch]);

  const router = createBrowserRouter([
    { path: "/signup", element: <SignUp /> },
    { path: "/signin", element: <SignIn /> },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [{ path: "/", element: <Home /> }],
    },
  ]);

  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
