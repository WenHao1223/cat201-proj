import React from "react";

const Login: React.FC = () => {
    return (
        <div className="container">
            <div className="login-form">
                <div className="title">Login</div>
                <form action="#">
                    <div className="input-boxes">
                        <div className="input-box">
                            <i className="fas fa-envelope"></i>
                            <input type="text" placeholder="Enter your email" required />
                        </div>
                        <div className="input-box">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Enter your password" required />
                        </div>
                        <div className="text"><a href="#">Forgot password?</a></div>
                        <div className="button input-box">
                            <input type="submit" value="Submit" />
                        </div>
                        <div className="text sign-up-text">Don't have an account? <a href="/register">Signup now</a></div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;