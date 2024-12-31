import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestAPI from "./pages/TestAPI";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import "./App.css";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/testapi" element={<TestAPI />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/main" element={<Main />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;