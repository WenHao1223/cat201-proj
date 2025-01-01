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

    useEffect(() => {
        console.log(currentUserGeneralDetails);
    }, [currentUserGeneralDetails]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/testapi" element={<TestAPI />} />
                    <Route path="/login" element={<Login setCurrentUserGeneralDetails={setCurrentUserGeneralDetails} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/main" element={<Main />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;