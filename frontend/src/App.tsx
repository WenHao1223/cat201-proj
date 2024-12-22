import React, { useEffect, useState } from "react";

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
                                "Error fetching data: " + (err as Error).message
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
        </div>
    );
};

export default App;
