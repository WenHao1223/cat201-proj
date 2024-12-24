import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SamplePage1 from "./pages/SamplePage1";
import SamplePage2 from "./pages/SamplePage2";

// Define the type for the data object
interface MyObject {
    name: string;
    id: number;
}

const App: React.FC = () => {
    const [data, setData] = useState<MyObject | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data from the backend when the component is mounted
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:9090/api/data"); // Adjust URL as necessary
                const result: MyObject = await response.json();
                setData(result);
            } catch (err) {
                setError("Error fetching data: " + (err as Error).message);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs once on component mount

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Router>
            <div>
                <h1>Welcome to Vite with React!</h1>
                <button
                    onClick={() => {
                        const fetchData = async () => {
                            try {
                                const response = await fetch(
                                    "http://localhost:9090/api/data"
                                ); // Adjust URL as necessary
                                const result: MyObject = await response.json();
                                setData(result);
                            } catch (err) {
                                setError(
                                    "Plese start the backend server as well.\nRefer to README.md in backend folder as well.\n Error fetching data: " + (err as Error).message
                                );
                            }
                        };
                        fetchData();
                    }}
                >
                    Fetch Data
                </button>
                {data ? (
                    <div>
                        <p>Name: {data.name}</p>
                        <p>ID: {data.id}</p>
                    </div>
                ) : (
                    <p>Loading data...</p>
                )}
                <div>
                    <Link to="/sample1">
                        <button>Go to Sample Page 1</button>
                    </Link>
                    <Link to="/sample2">
                        <button>Go to Sample Page 2</button>
                    </Link>
                </div>
                <Routes>
                    <Route path="/sample1" element={<SamplePage1 />} />
                    <Route path="/sample2" element={<SamplePage2 />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
