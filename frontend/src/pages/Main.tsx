import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Main: React.FC = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login");
    };

    const navigateToRegister = () => {
        navigate("/register");
    };

    return (
        <div>
            <h1>Chef's Aura</h1>
            <p>Please choose an option below:</p>
            <div>
                <Link to="/testapi">
                    <button>Go to Test API Page</button>
                </Link>
                <Link to="/Login">
                    <button>Go to Login</button>
                </Link>
                <Link to="/Register">
                    <button>Go to Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Main;

