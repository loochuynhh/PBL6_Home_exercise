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
            debugger
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
            <div className="container-login100" style={{ backgroundImage: `url('/images/bg-01.jpg')` }}>
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                    <form className="login100-form validate-form" onSubmit={handleSubmit}>
                        <span className="login100-form-title p-b-49">Login</span>

                        <div className="wrap-input100">
                            <span className="label-input100">Email or username</span>
                            <input
                                className="input100"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Type your email or username"
                                autoComplete="username"
                            />
                            <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-t-23" data-validate="Password is required">
                            <span className="label-input100">Password</span>
                            <input
                                className="input100"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Type your password"
                                autoComplete="current-password"
                            />
                            <span className="focus-input100" data-symbol="&#xf190;"></span>
                        </div>

                        <div className="text-left p-t-8 p-b-31">
                            <a href="/forgotPassword">Forgot password?</a>
                        </div>

                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" type="submit">Login</button>
                            </div>
                        </div>

                        <div className="login-container">
                            <p className="sign-up-text">Don't have an account?
                                <Link to="/signup"> Sign up</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
