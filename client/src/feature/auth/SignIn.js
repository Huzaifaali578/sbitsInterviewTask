import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { loginUser } from "../../Redux/actions/authActions";

function SignIn() {
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser(data))
    };

    useEffect(() => {
        if (userLogin && typeof userLogin === "object") {
            if (userLogin?.success === true) {
                toast.success(userLogin.message || "Login successful");
                navigate("/");  
            } else if (userLogin?.success === false) {
                toast.error(userLogin.message || "Login Failed");
            }
        }
    }, [userLogin, navigate]);


    return (
        <>
            {/* {userLogin?.success && <Navigate to='/' />} */}
            <div className="flex justify-center items-center max-w-full min-h-[100vh] bg-slate-300">
                <div className="bg-white w-full max-w-md p-4 rounded shadow-md mx-auto">
                    <h3 className="text-3xl font-bold mb-4 text-center">Sign In</h3>
                    <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-medium">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter Your Email"
                                className="px-3 py-2 bg-slate-100 focus:outline-primary rounded-md"
                                value={data.email}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="font-medium">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Your Password"
                                className="px-3 py-2 bg-slate-100 focus:outline-primary rounded-md"
                                value={data.password}
                                onChange={handleOnChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-400 px-2 py-2 mt-2 text-lg font-bold hover:bg-green-600 rounded text-white"
                        >
                            Sign In
                        </button>
                        <p className="mt-3 text-center text-lg">
                            Not Registered?{" "}
                            <Link to="/signup" className="hover:text-primary text-lg">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;
