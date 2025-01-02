import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TestAPI from "./pages/TestAPI";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import "./App.css";

import { UserGeneralDetailsInterface } from "@interfaces/API/UserInterface";

const App: React.FC = () => {
    const [currentUserGeneralDetails, setCurrentUserGeneralDetails] =
        useState<UserGeneralDetailsInterface | null>(null);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        console.log("Current user general details: ", currentUserGeneralDetails);
    }, [currentUserGeneralDetails]);
    useEffect(() => {
        console.log("Is login: ", isLogin);
    }, [isLogin]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Main isLogin={isLogin} />} />
                    <Route path="/testapi" element={<TestAPI />} />
                    <Route
                        path="/login"
                        element={
                            <Login
                                setCurrentUserGeneralDetails={
                                    setCurrentUserGeneralDetails
                                }
                                setIsLogin={setIsLogin}
                                isLogin={isLogin}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={<Register isLogin={isLogin} />}
                    />
                    <Route path="/main" element={<Main isLogin={isLogin} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
