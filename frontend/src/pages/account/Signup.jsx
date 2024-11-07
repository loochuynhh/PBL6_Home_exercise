import React, { useState } from "react";
import "../../assets/css/account.css";
import "../../assets/css/util.css";
import GoogleAuth from "helpers/auth/GoogleAuth";
import FacebookAuth from "helpers/auth/FacebookAuth";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
            return;
        }

        try {
            const response = await axios.post("/api/register", {
                username,
                password,
                email,
            });      
            navigate("/login");
        } catch (error) {
            if (error.response) {
                alert(`Đăng ký không thành công: ${error.response.data.message || 'Lỗi không xác định'}`);
            } else if (error.request) {
                alert("Không nhận được phản hồi từ server. Vui lòng thử lại sau.");
            } else {
                alert(`Đã xảy ra lỗi: ${error.message}`);
            }
        }
    };

    return (
        <div className="limiter">
            <div className="container-login100" style={{ backgroundImage: `url('/images/bg-01.jpg')` }}>
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                    <form className="login100-form validate-form" onSubmit={handleSubmit}>
                        <span className="login100-form-title p-b-49">Sign Up</span>

                        <div className="wrap-input100">
                            <span className="label-input100">Username</span>
                            <input
                                className="input100"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Type your username"
                                autoComplete="username"
                            />
                            <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>

                        <div className="wrap-input100 m-t-23">
                            <span className="label-input100">Email</span>
                            <input
                                className="input100"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Type your email"
                                autoComplete="email"
                            />
                            <span className="focus-input100" data-symbol="&#9993;"></span>
                        </div>

                        <div className="wrap-input100 m-t-23">
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

                        <div className="wrap-input100 m-t-23">
                            <span className="label-input100">Confirm Password</span>
                            <input
                                className="input100"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                autoComplete="current-password"
                            />
                            <span className="focus-input100" data-symbol="&#xf190;"></span>
                        </div>

                        <div className="container-login100-form-btn m-t-30">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button className="login100-form-btn" type="submit">CREATE ACCOUNT</button>
                            </div>
                        </div>

                        <div className="login-container">
                            <div className="divider">
                                <span className="line"></span>
                                <span className="or-text">Or continue with</span>
                                <span className="line"></span>
                            </div>

                            <div className="social-login">
                                <GoogleAuth />
                                <FacebookAuth />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
