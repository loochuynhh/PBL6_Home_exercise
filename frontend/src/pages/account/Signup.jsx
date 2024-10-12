import "../../assets/css/account.css"
import "../../assets/css/util.css"

import GoogleAuth from "helpers/auth/GoogleAuth"
import FacebookAuth from "helpers/auth/FacebookAuth"
import { useSignUpFormik } from "helpers/validate/Formik"

const Signup = () => {
    const formik = useSignUpFormik()

    return ( 
        <div className="limiter">
            <div className="container-login100" style={{ backgroundImage: `url('/images/bg-01.jpg')` }}>
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <form className="login100-form validate-form" onSubmit={formik.handleSubmit}>
                    <span className="login100-form-title p-b-49">Sign Up</span>

                    <div className="wrap-input100">
                        <span className="label-input100">Username</span>
                        <input 
                            className="input100" 
                            type="text" 
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            placeholder="Type your username"
                            autoComplete="username"
                        />
                        <span className="focus-input100" data-symbol="&#xf206;"></span>
                    </div>

                    {formik.errors.username && (
                        <p className="errorMsg">{formik.errors.username}</p>
                    )}

                    <div className="wrap-input100 m-t-23">
                        <span className="label-input100">Email</span>
                        <input 
                            className="input100" 
                            type="email" 
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            placeholder="Type your email"
                            autoComplete="email"
                        />
                        <span className="focus-input100" data-symbol="&#9993;"></span>
                    </div>

                    {formik.errors.email && (
                        <p className="errorMsg">{formik.errors.email}</p>
                    )}

                    <div className="wrap-input100 m-t-23">
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

                    <div className="wrap-input100 m-t-23">
                        <span className="label-input100">Confirm Password</span>
                        <input 
                            className="input100" 
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            placeholder="Confirm your password"
                            autoComplete="current-confirmPassword"
                        />
                        <span className="focus-input100" data-symbol="&#xf190;"></span>
                    </div>

                    {formik.errors.confirmPassword && (
                        <p className="errorMsg">{formik.errors.confirmPassword}</p>
                    )}

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
}
 
export default Signup;