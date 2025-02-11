import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function SignUp() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8000/api/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const user = await response.json();
            console.log("User Response:", user.message);
            if (user?.success === true) {
                toast.success(user.message);
                setData({ name: "", email: "", password: "" });
            } else if (user.success === false) {
                toast.error(user.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="flex justify-center items-center max-w-full min-h-[100vh] bg-slate-300">
            <div className="bg-white w-full max-w-md p-4 rounded shadow-md mx-auto">
                <h3 className="text-3xl font-bold mb-4 text-center">Sign Up</h3>
                <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-medium">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Your Name"
                            className="px-3 py-2 bg-slate-100 focus:outline-primary rounded-md"
                            value={data.name}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
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
                        Sign Up
                    </button>
                    <p className="mt-3 text-center text-lg">
                        Already have an account?{" "}
                        <Link to="/signin" className="hover:text-primary text-lg">
                            Sing In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
