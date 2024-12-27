import React from "react";
import { User } from "@interfaces/API/UserInterface";

interface ValidateUserLoginAPIDataProps {
    userEmail: string;
    userPassword: string;
    userLoginStatus: boolean;
}

const ValidateUserLoginAPIData: React.FC<ValidateUserLoginAPIDataProps> = ({
    userEmail,
    userPassword,
    userLoginStatus,
}) => {
    return (
        <div>
            <h1>User Login Status</h1>
            <div>
                Email: {userEmail}
                <br />
                Password: {userPassword}
                <hr />
                User login status: {userLoginStatus ? "Success" : "Failure"}
            </div>
        </div>
    );
};

export default ValidateUserLoginAPIData;
