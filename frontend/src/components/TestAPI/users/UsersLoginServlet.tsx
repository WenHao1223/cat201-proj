import React from "react";
import { UserGeneralDetailsInterface } from "@interfaces/API/UserInterface";

interface UsersLoginServletProps {
    userEmail: string;
    userPassword: string;
    userLoginStatus: boolean;
    currentUserGeneralDetails: UserGeneralDetailsInterface | null;
}

const UsersLoginServlet: React.FC<UsersLoginServletProps> = ({
    userEmail,
    userPassword,
    userLoginStatus,
    currentUserGeneralDetails,
}) => {
    return (
        <div>
            <h3>User Login Status</h3>
            <div>
                Email: {userEmail}
                <br />
                Password: {userPassword}
                <hr />
                User login status: {userLoginStatus ? "Success" : "Failure"}
            </div>
            <h1>User Data</h1>
            {currentUserGeneralDetails && (
                <div
                    key={currentUserGeneralDetails.email}
                    style={{
                        border: "1px solid #ccc",
                        margin: "10px",
                        padding: "10px",
                    }}
                >
                    <h3>{currentUserGeneralDetails.username}</h3>
                    <p>Email: {currentUserGeneralDetails.email}</p>
                    <p>First Name: {currentUserGeneralDetails.firstName}</p>
                    <p>Last Name: {currentUserGeneralDetails.lastName}</p>
                    <p>Phone No: {currentUserGeneralDetails.phoneNo}</p>
                    <p>Gender: {currentUserGeneralDetails.gender}</p>
                    <p>Date of Birth: {currentUserGeneralDetails.dob}</p>
                    <p>Nationality: {currentUserGeneralDetails.nationality}</p>
                </div>
            )}
        </div>
    );
};

export default UsersLoginServlet;
