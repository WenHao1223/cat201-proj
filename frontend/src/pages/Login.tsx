import React, { useState } from "react";
import "../App.css";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle login logic here
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="login-page">
            <div className="container">
                <div className="header">
                    <i className="fas fa-kitchen-set"></i> Chef's Aura
                </div>
                <div className="form-container">
                    <div className="image-container" style={{ marginTop: "20px" }}>
                        <img
                            src="https://www.color-meanings.com/wp-content/uploads/bright-kitchen-stainless-steel-appliances.jpeg"
                            alt="Sample photo"
                            className="img-fluid"
                            style={{ width: "400px", height: "200px", borderRadius: "15px" }}
                        />
                    </div>
                    <div className="form-content">
                        <header style={{ textAlign: "center" }}>Login</header>
                        <form onSubmit={handleSubmit} className="form">
                            <div className="input-box">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="text"><a href="#">Forgot password?</a></div>
                            <div className="button input-box">
                                <input type="submit" value="Submit" />
                            </div>
                            <div className="text sign-up-text">Don't have an account? <a href="/register">Signup now</a></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;