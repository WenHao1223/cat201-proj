import React, { isValidElement } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    UserIcon,
    ShoppingCartIcon,
    TruckIcon,
} from "@heroicons/react/20/solid";
import logo from "@assets/ChefAuraLogo.webp";
import { CartGeneralInterface } from "@interfaces/API/UserInterface";

interface NavbarProps {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentUserGeneralDetails: React.Dispatch<React.SetStateAction<any>>;
    isAdmin: boolean;
    carts: CartGeneralInterface[] | null;
}

const Navbar: React.FC<NavbarProps> = ({
    isLogin,
    setIsLogin,
    setCurrentUserGeneralDetails,
    isAdmin,
    carts,
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
                    <img
                        src={logo}
                        alt="Chef's Aura Logo"
                        className="inline-block mr-2 small-logo"
                    />
                    Chef's Aura
                </div>
            </Link>
            <div className="flex items-center space-x-4">
                {isLogin ? (
                    <>
                        {isAdmin ? (
                            <>
                                <Link to="/admin">
                                    <button className="btn btn-gray-800">
                                        Admin
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/cart">
                                    <div className="h-8 w-8 justify-center relative">
                                        <ShoppingCartIcon className="h-6 w-8 text-gray-800" />
                                        {carts && carts?.length > 0 && (
                                            <div className="badge badge-secondary absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                                                {carts?.length > 99
                                                    ? "99+"
                                                    : carts?.length}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <Link to="/orderHistory">
                                    <TruckIcon className="h-6 w-8 text-gray-800" />
                                </Link>
                                <Link to="/profile">
                                    <UserIcon className="h-6 w-8 text-gray-800" />
                                </Link>
                            </>
                        )}
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
                            <button className="btn btn-light hover:bg-slate-500">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="btn btn-gray-800">
                                Register
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
