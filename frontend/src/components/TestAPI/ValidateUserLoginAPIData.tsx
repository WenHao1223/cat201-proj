import React from "react";
import { UserGeneralDetailsInterface } from "@interfaces/API/UserInterface";

interface ValidateUserLoginAPIDataProps {
    userEmail: string;
    userPassword: string;
    userLoginStatus: boolean;
    currentUserGeneralDetails: UserGeneralDetailsInterface | null;
}

const ValidateUserLoginAPIData: React.FC<ValidateUserLoginAPIDataProps> = ({
    userEmail,
    userPassword,
    userLoginStatus,
    currentUserGeneralDetails,
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
                    <h2>{currentUserGeneralDetails.username}</h2>
                    <p>Email: {currentUserGeneralDetails.email}</p>
                    <p>First Name: {currentUserGeneralDetails.firstName}</p>
                    <p>Last Name: {currentUserGeneralDetails.lastName}</p>
                    <p>Phone No: {currentUserGeneralDetails.phoneNo}</p>
                    <p>
                        Gender: {currentUserGeneralDetails.gender === 1 ? "Male" : "Female"}
                    </p>
                    <p>Date of Birth: {currentUserGeneralDetails.dob}</p>
                    <p>Nationality: {currentUserGeneralDetails.nationality}</p>
                </div>
            )}
        </div>
    );
};

export default ValidateUserLoginAPIData;
