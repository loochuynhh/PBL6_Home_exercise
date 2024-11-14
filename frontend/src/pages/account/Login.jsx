import React, { useState } from "react";
import "../../assets/css/account.css";
import "../../assets/css/util.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const { setIsLoggedIn, setUserName } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/login", {
                username,
                password,
            });
            localStorage.setItem("accessToken", response.data.accessToken);
            toast.success("Đăng nhập thành công!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsLoggedIn(true);
            setUserName(response.data.username);
            navigate("/");
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.message || error.response.data.error || "Lỗi không xác định";
                console.error("Đăng nhập không thành công:", errorMsg);
                toast.error(`Đăng nhập không thành công: ${errorMsg}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (error.request) {
                console.error("Không nhận được phản hồi từ server:", error.request);
                toast.error("Không nhận được phản hồi từ server. Vui lòng thử lại sau.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                console.error("Đã xảy ra lỗi:", error.message);
                toast.error(`Đã xảy ra lỗi: ${error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <div className="limiter">
            <ToastContainer />
            <div
                className="container-login100 w-full min-h-screen bg-cover bg-center flex justify-center items-center"
                style={{ backgroundImage: `url('/images/bg-01.jpg')` }}
            >
                <div className="wrap-login100 w-full max-w-md bg-white bg-opacity-80 p-10 rounded-lg shadow-xl">
                    <form className="login100-form validate-form" onSubmit={handleSubmit}>
                        <h2 className="login100-form-title text-3xl text-center font-bold text-gray-800 mb-8">
                            Login
                        </h2>

                        <div className="wrap-input100 mb-6">
                            <label className="label-input100 text-sm text-gray-600 mb-2">Email or username</label>
                            <input
                                className="input100 w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Type your email or username"
                                autoComplete="username"
                            />
                        </div>

                        <div className="wrap-input100 mb-6">
                            <label className="label-input100 text-sm text-gray-600 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    className="input100 w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Type your password"
                                    autoComplete="current-password"
                                />
                                <span
                                    className="absolute top-3 right-4 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <i className="fas fa-eye-slash text-blue-500"></i>
                                    ) : (
                                        <i className="fas fa-eye text-blue-500"></i>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="text-left mb-8">
                            <a href="/forgotPassword" className="text-sm text-blue-600 hover:text-blue-800 transition duration-300">
                                Forgot password?
                            </a>
                        </div>

                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <button
                                    className="login100-form-btn w-full bg-blue-500 text-white text-lg font-semibold py-3 rounded-lg shadow-lg transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </div>

                        <div className="login-container text-center mt-8">
                            <p className="sign-up-text text-sm text-gray-600">
                                Don't have an account?
                                <Link to="/signup" className="text-blue-600 hover:text-blue-800 transition duration-300">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
