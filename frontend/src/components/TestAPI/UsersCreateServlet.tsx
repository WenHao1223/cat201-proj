import React from "react";
import { UserInterface } from "@interfaces/API/UserInterface";

interface UsersCreateServletProps {
    username: string;
    email: string;
    password: string;
    nationality: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    gender: Number;
    dob: string;
    agreeToTerms: boolean;
    createAccountStatus: boolean;
}

const UsersCreateServlet: React.FC<UsersCreateServletProps> = ({
    username,
    email,
    password,
    nationality,
    firstName,
    lastName,
    phoneNo,
    gender,
    dob,
    agreeToTerms,
    createAccountStatus,
}) => {
    return (
        <div>
            <h2>Create Account Status</h2>
            <div>
                Username: {username}
                <br />
                Email: {email}
                <br />
                Password: {password}
                <br />
                Nationality: {nationality}
                <br />
                First Name: {firstName}
                <br />
                Last Name: {lastName}
                <br />
                Phone No: {phoneNo}
                <br />
                Gender: {gender == 1 ? "Male" : "Female"}
                <br />
                Date of Birth: {dob}
                <br />
                Agree to Terms: {agreeToTerms ? "Yes" : "No"}
                <hr />
                Create account status: {createAccountStatus ? "Success" : "Failure"}
            </div>
        </div>
    );
};

export default UsersCreateServlet;
