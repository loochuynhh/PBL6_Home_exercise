import React, { useState } from "react";
import "../../assets/css/account.css";
import "../../assets/css/util.css";
import GoogleAuth from "helpers/auth/GoogleAuth";
import FacebookAuth from "helpers/auth/FacebookAuth";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
      <div
        className="container-login100 w-full min-h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url('/images/bg-01.jpg')` }}
      >
        <div className="wrap-login100 w-full max-w-lg bg-white bg-opacity-80 p-10 rounded-lg shadow-xl">
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <h2 className="login100-form-title text-3xl text-center font-bold text-blue-400 mb-8">
              Sign Up
            </h2>

            <div className="wrap-input100 mb-6">
              <label className="label-input100 text-sm text-gray-600 mb-2">Username</label>
              <input
                className="input100 w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-300"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Type your username"
                autoComplete="username"
              />
            </div>

            <div className="wrap-input100 mb-6">
              <label className="label-input100 text-sm text-gray-600 mb-2">Email</label>
              <input
                className="input100 w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-300"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email"
                autoComplete="email"
              />
            </div>

            <div className="wrap-input100 mb-6 relative">
              <label className="label-input100 text-sm text-gray-600 mb-2">Password</label>
              <input
                className="input100 w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-300"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password"
                autoComplete="new-password"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash text-blue-500"></i>
                ) : (
                  <i className="fas fa-eye text-blue-500"></i>
                )}
              </span>
            </div>

            <div className="wrap-input100 mb-6 relative">
              <label className="label-input100 text-sm text-gray-600 mb-2">Confirm Password</label>
              <input
                className="input100 w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-300"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash text-blue-500"></i>
                ) : (
                  <i className="fas fa-eye text-blue-500"></i>
                )}
              </span>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <button
                  className="login100-form-btn w-full bg-blue-400 text-white text-lg font-semibold py-3 rounded-lg shadow-lg transition duration-300 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  type="submit"
                >
                  CREATE ACCOUNT
                </button>
              </div>
            </div>

            <div className="login-container text-center mt-8">
              <p className="sign-up-text text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-500 transition duration-300"
                >
                  Login
                </Link>
              </p>
            </div>

            <div className="login-container text-center mt-8">
              <div className="divider">
                <span className="line"></span>
                <span className="or-text">Or continue with</span>
                <span className="line"></span>
              </div>

              <div className="social-login mt-4 flex justify-center gap-4">
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
