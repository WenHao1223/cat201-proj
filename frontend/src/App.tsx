import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TestAPI from "./pages/TestAPI";
import SamplePage1 from "./pages/SamplePage1";
import SamplePage2 from "./pages/SamplePage2";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <h1>Chef's Aura</h1>
                <div>
                    <Link to="/testapi">
                        <button>Go to Test API Page</button>
                    </Link>
                    <Link to="/sample1">
                        <button>Go to Sample Page 1</button>
                    </Link>
                    <Link to="/sample2">
                        <button>Go to Sample Page 2</button>
                    </Link>
                </div>
                <Routes>
                    <Route path="/testapi" element={<TestAPI />} />
                    <Route path="/sample1" element={<SamplePage1 />} />
                    <Route path="/sample2" element={<SamplePage2 />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
