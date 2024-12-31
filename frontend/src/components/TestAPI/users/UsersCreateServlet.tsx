import React from "react";
import { UserInterface } from "@interfaces/API/UserInterface";

interface UsersCreateServletProps {
    craeteAccountObject: UserInterface;
    createAccountStatus: boolean;
}

const UsersCreateServlet: React.FC<UsersCreateServletProps> = ({
    craeteAccountObject,
    createAccountStatus,
}) => {
    return (
        <div>
            <h2>Create Account Status</h2>
            <div>
                Username: {craeteAccountObject.username}
                <br />
                Email: {craeteAccountObject.email}
                <br />
                Password: {craeteAccountObject.password}
                <br />
                Nationality: {craeteAccountObject.nationality}
                <br />
                First Name: {craeteAccountObject.firstName}
                <br />
                Last Name: {craeteAccountObject.lastName}
                <br />
                Phone No: {craeteAccountObject.phoneNo}
                <br />
                Gender: {craeteAccountObject.gender}
                <br />
                Date of Birth: {craeteAccountObject.dob}
                <br />
                Agree to Terms: {craeteAccountObject.agreeToTerms ? "Yes" : "No"}
                <hr />
                Create Account Status: {createAccountStatus ? "Success" : "Failed"}
            </div>
        </div>
    );
};

export default UsersCreateServlet;
