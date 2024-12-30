import React, { useEffect } from "react";

const Login: React.FC = () => {
    useEffect(() => {
        document.title = "Login Page";
    }, []);

    return (
        <div>
            <h1>Login Page</h1>
            <p>This is the content of the Login Page.</p>
        </div>
    );
};

export default Login;