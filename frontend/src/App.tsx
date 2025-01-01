import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TestAPI from "./pages/TestAPI";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SamplePage2 from "./pages/SamplePage2";
import Main from "./pages/Main";

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/testapi" element={<TestAPI />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/sample2" element={<SamplePage2 />} />
                    <Route path="/" element={<Main />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
