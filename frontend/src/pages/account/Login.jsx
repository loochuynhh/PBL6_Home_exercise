import "../../assets/css/account.css"
import "../../assets/css/util.css"
import "../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css"
import "../../assets/fonts/iconic/css/material-design-iconic-font.min.css"

import { Link } from "react-router-dom";
import GoogleAuth from "helpers/auth/GoogleAuth"
import FacebookAuth from "helpers/auth/FacebookAuth"
import { useLoginFormik } from "helpers/validate/Formik"

const Login = () => {
    const formik = useLoginFormik()

    return ( 
        <div className="limiter">
            <div className="container-login100" style={{ backgroundImage: `url('/images/bg-01.jpg')` }}>
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                    <form className="login100-form validate-form" onSubmit={formik.handleSubmit}>
                        <span className="login100-form-title p-b-49">Login</span>

                        <div className="wrap-input100">
                            <span className="label-input100">Email or username</span>
                            <input 
                                className="input100" 
                                type="text" 
                                id="username"
                                name="username"
                                onChange={formik.handleChange}
                                placeholder="Type your email or username"
                                autoComplete="username"
                            />
                            <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>

                        {formik.errors.username && (
                            <p className="errorMsg">{formik.errors.username}</p>
                        )}

                        <div className="wrap-input100 validate-input m-t-23" data-validate="Password is required">
                            <span className="label-input100">Password</span>
                            <input 
                                className="input100" 
                                type="password"
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                placeholder="Type your password"
                                autoComplete="current-password"
                            />
                            <span className="focus-input100" data-symbol="&#xf190;"></span>
                        </div>

                        {formik.errors.password && (
                            <p className="errorMsg">{formik.errors.password}</p>
                        )}

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

                            <div className="divider">
                                <span className="line"></span>
                                <span className="or-text">Or continue with</span>
                                <span className="line"></span>
                            </div>

                            <div className="social-login">
                                <GoogleAuth/>
                                <FacebookAuth/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Login;