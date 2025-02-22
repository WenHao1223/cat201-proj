import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "@styles/LoginRegister.css";
import handleApiCall from "@utils/handleApiCall";
import Swal from "sweetalert2";

import logo from "@assets/ChefAuraLogo.webp";

interface LoginProps {
    setCurrentUserGeneralDetails: React.Dispatch<React.SetStateAction<any>>;
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({
    setCurrentUserGeneralDetails,
    isLogin,
    setIsLogin,
    setIsAdmin,
}) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("" as string | null);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const validateUserLoginMethod = async (email: string, password: string) => {
        await handleApiCall(
            "users/login",
            "POST",
            { email, password },
            async (result) => {
                if (await result.loginStatus) {
                    setError(null);
                    setIsLogin(true);
                    setCurrentUserGeneralDetails(JSON.parse(result.user));
                    setIsAdmin(JSON.parse(result.user).role === "admin");
                    Swal.fire({
                        title: "Login successful!",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    }).then(() => {
                        navigate("/main");
                    });
                } else {
                    setError("\n Invalid email or password");
                    setIsLogin(false);
                }
            },
            (error) => {
                setError("\n Error validating user login: " + error);
                setIsLogin(false);
            }
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateUserLoginMethod(email, password);
    };

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
    }, [isLogin]);

    return (
        <div className="bg-white text-black min-h-screen flex items-center justify-center">
            <div className="container">
                <Link to="/">
                    <div className="header">
                        Chef's Aura
                    </div>
                </Link>
                <div className="form-container">
                    <div
                        className="image-container"
                        style={{ marginTop: "20px" }}
                    >
                        <img
                            src="https://th.bing.com/th/id/OIP.RwtkstiEHa-_o2QIKYBy3QHaE8?w=238&h=188&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                            alt="Sample photo"
                            className="img-fluid object-cover"
                            style={{
                                width: "400px",
                                height: "200px",
                                borderRadius: "15px",
                            }}
                        />
                    </div>
                    <div className="form-content">
                        <header style={{ textAlign: "center" }}>Login</header>
                        <form onSubmit={handleSubmit} className="form">
                            <div className="input-box">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            {error && (
                                <div className="text-red-500 pt-4">{error}</div>
                            )}
                            <div className="button-container">
                                <button
                                    type="submit"
                                    className="btn btn-full-width bg-gray-500 text-white ms-2"
                                >
                                    Submit
                                </button>
                            </div>
                            <div className="text sign-up-text pt-4">
                                Don't have an account?{" "}
                                <Link to="/register">Sign up now</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
