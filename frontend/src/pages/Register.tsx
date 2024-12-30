import React from "react";

const Register: React.FC = () => {
    return (
        <div className="container">
            <div className="register-form">
                <div className="title">Register</div>
                <form action="#">
                    <div className="input-boxes">
                        <div className="input-box">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Enter your name" required />
                        </div>
                        <div className="input-box">
                            <i className="fas fa-envelope"></i>
                            <input type="text" placeholder="Enter your email" required />
                        </div>
                        <div className="input-box">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Enter your password" required />
                        </div>
                        <div className="button input-box">
                            <input type="submit" value="Submit" />
                        </div>
                        <div className="text sign-up-text">Already have an account? <a href="/login">Login now</a></div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;