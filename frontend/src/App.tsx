import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TestAPI from "./pages/TestAPI";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./App.css";

import { UserGeneralDetailsInterface } from "@interfaces/API/UserInterface";

const App: React.FC = () => {
    const [currentUserGeneralDetails, setCurrentUserGeneralDetails] =
        useState<UserGeneralDetailsInterface | null>(null);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        console.log(
            "Current user general details: ",
            currentUserGeneralDetails
        );
    }, [currentUserGeneralDetails]);
    useEffect(() => {
        console.log("Is login: ", isLogin);
    }, [isLogin]);

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
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
