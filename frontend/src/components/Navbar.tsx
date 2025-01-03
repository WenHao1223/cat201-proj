import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

interface NavbarProps {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentUserGeneralDetails: React.Dispatch<React.SetStateAction<any>>;
}

const Navbar: React.FC<NavbarProps> = ({
    isLogin,
    setIsLogin,
    setCurrentUserGeneralDetails,
}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
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
        <nav className="fixed w-screen bg-white shadow-md md:px-8 xs:px-4 px-2 py-4 flex justify-between items-center z-50">
            <Link to="/">
                <div className="text-2xl font-bold text-gray-800">
                    Chef's Aura
                </div>
            </Link>
            <div className="flex items-center space-x-4">
                {isLogin ? (
                    <>
                        <Link to="/cart">
                            <ShoppingCartIcon className="h-6 w-6 text-gray-800" />
                        </Link>
                        <Link to="/checkout">
                            <button className="btn btn-warning">Checkout</button>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="btn btn-light"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="btn btn-light">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="btn btn-warning">Register</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
