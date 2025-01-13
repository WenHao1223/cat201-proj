import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TestAPI from "./pages/TestAPI";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import "./App.css";

import {
    CartGeneralInterface,
    UserGeneralDetailsInterface,
} from "@interfaces/API/UserInterface";
import Profile from "@pages/Profile";

const App: React.FC = () => {
    const [currentUserGeneralDetails, setCurrentUserGeneralDetails] =
        useState<UserGeneralDetailsInterface | null>(null);
    const [isLogin, setIsLogin] = useState(false);
    const [carts, setCarts] = useState<CartGeneralInterface[] | null>(null);

    useEffect(() => {
        const currentUserGeneralDetailsString = localStorage.getItem(
            "currentUserGeneralDetails"
        );
        if (currentUserGeneralDetailsString) {
            setCurrentUserGeneralDetails(
                JSON.parse(currentUserGeneralDetailsString)
            );
        }

        const isLoginString = localStorage.getItem("isLogin");
        if (isLoginString) {
            setIsLogin(JSON.parse(isLoginString));
        }

        // console.log("currentUserGeneralDetails", currentUserGeneralDetails);
        // console.log("isLogin", isLogin);
    }, []);

    useEffect(() => {
        if (currentUserGeneralDetails !== null) {
            localStorage.setItem(
                "currentUserGeneralDetails",
                JSON.stringify(currentUserGeneralDetails)
            );
        }
    }, [currentUserGeneralDetails]);
    useEffect(() => {
        if (isLogin !== false) {
            localStorage.setItem("isLogin", JSON.stringify(isLogin));
        }
    }, [isLogin]);

    useEffect(() => {
        console.log("carts", carts);
    }, [carts]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Main
                                currentUserGeneralDetails={
                                    currentUserGeneralDetails
                                }
                                setCurrentUserGeneralDetails={
                                    setCurrentUserGeneralDetails
                                }
                                isLogin={isLogin}
                                setIsLogin={setIsLogin}
                            />
                        }
                    />
                    <Route path="/testapi" element={<TestAPI />} />
                    <Route
                        path="/login"
                        element={
                            <Login
                                setCurrentUserGeneralDetails={
                                    setCurrentUserGeneralDetails
                                }
                                isLogin={isLogin}
                                setIsLogin={setIsLogin}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={<Register isLogin={isLogin} />}
                    />
                    <Route
                        path="/main"
                        element={
                            <Main
                                currentUserGeneralDetails={
                                    currentUserGeneralDetails
                                }
                                setCurrentUserGeneralDetails={
                                    setCurrentUserGeneralDetails
                                }
                                isLogin={isLogin}
                                setIsLogin={setIsLogin}
                            />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <Cart
                                carts={carts}
                                setCarts={setCarts}
                                currentUserGeneralDetails={
                                    currentUserGeneralDetails!
                                }
                                setCurrentUserGeneralDetails={
                                    setCurrentUserGeneralDetails
                                }
                                isLogin={isLogin}
                                setIsLogin={setIsLogin}
                            />
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <Checkout
                                currentUserGeneralDetails={
                                    currentUserGeneralDetails!
                                }
                                isLogin={isLogin}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <Profile
                                currentUserGeneralDetails={
                                    currentUserGeneralDetails
                                }
                                setCurrentUserGeneralDetails={
                                    setCurrentUserGeneralDetails
                                }
                                isLogin={isLogin}
                                setIsLogin={setIsLogin}
                            />
                        }
                    />
                    <Route
                        path="/product/:productID"
                        element={
                            <Product/>
                        }
                    />
                    
                </Routes>
            </div>
        </Router>
    );
};

export default App;
