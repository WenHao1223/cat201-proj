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
        localStorage.removeItem("currentUserGeneralDetails");
        localStorage.removeItem("isLogin");
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
                            <ShoppingCartIcon className="h-6 w-8 text-gray-800" />
                        </Link>
                        <Link to="/checkout">
                            <button className="btn btn-gray-800">Checkout</button>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="btn btn-light hover:bg-slate-500 hover:text-white"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="btn btn-light hover:bg-slate-500">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="btn btn-gray-800">Register</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
