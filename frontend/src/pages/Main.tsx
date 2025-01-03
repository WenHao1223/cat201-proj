import { UserGeneralDetailsInterface } from "@interfaces/API/UserInterface";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface MainProps {
    currentUserGeneralDetails: UserGeneralDetailsInterface | null;
    setCurrentUserGeneralDetails: React.Dispatch<
        React.SetStateAction<UserGeneralDetailsInterface | null>
    >;
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main: React.FC<MainProps> = ({
    currentUserGeneralDetails,
    setCurrentUserGeneralDetails,
    isLogin,
    setIsLogin,
}) => {
    const navigate = useNavigate();

    const logout = () => {
        setCurrentUserGeneralDetails(null);
        setIsLogin(false);
        Swal.fire({
            title: "Logout successful!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
            navigate("/login");
        });
    };

    return (
        <div>
            <h1>Chef's Aura</h1>
            <p>Please choose an option below:</p>
            <div>
                <Link to="/testapi">
                    <button className="text-white">Go to Test API Page</button>
                </Link>
                {!isLogin && (
                    <>
                        <Link to="/Login">
                            <button className="text-white">Go to Login</button>
                        </Link>
                        <Link to="/Register">
                            <button className="text-white">
                                Go to Register
                            </button>
                        </Link>
                    </>
                )}
                {isLogin && (
                    <>
                        <Link to="/cart">
                            <button className="text-white">Go to Cart</button>
                        </Link>
                        <Link to="/checkout">
                            <button className="text-white">
                                Go to Checkout
                            </button>
                        </Link>
                        <button className="text-white" onClick={logout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Main;
