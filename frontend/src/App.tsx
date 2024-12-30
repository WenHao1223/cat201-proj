import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TestAPI from "./pages/TestAPI";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <div>
                    <Link to="/testapi">
                        <button>Go to Test API Page</button>
                    </Link>
                    <Link to="/Main">
                        <button>Go to Main</button>
                    </Link>
                </div>
                <Routes>
                    <Route path="/testapi" element={<TestAPI />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Main" element={<Main />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
