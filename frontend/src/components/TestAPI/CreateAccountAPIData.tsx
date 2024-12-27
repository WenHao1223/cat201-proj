import React from "react";
import { UserInterface } from "@interfaces/API/UserInterface";

interface CreateAccountAPIDataProps {
    createAccountUsername: string;
    createAccountEmail: string;
    createAccountPassword: string;
    createAccountNationality: string;
    createAccountFirstName: string;
    createAccountLastName: string;
    createAccountPhoneNo: string;
    createAccountGender: Number;
    createAccountDOB: string;
    createAccountAgreeToTerms: boolean;
    createAccount: boolean;
}

const CreateAccountAPIData: React.FC<CreateAccountAPIDataProps> = ({
    createAccountUsername,
    createAccountEmail,
    createAccountPassword,
    createAccountNationality,
    createAccountFirstName,
    createAccountLastName,
    createAccountPhoneNo,
    createAccountGender,
    createAccountDOB,
    createAccountAgreeToTerms,
    createAccount,
}) => {
    return (
        <div>
            <h1>Create Account Status</h1>
            <div>
                Username: {createAccountUsername}
                <br />
                Email: {createAccountEmail}
                <br />
                Password: {createAccountPassword}
                <br />
                Nationality: {createAccountNationality}
                <br />
                First Name: {createAccountFirstName}
                <br />
                Last Name: {createAccountLastName}
                <br />
                Phone No: {createAccountPhoneNo}
                <br />
                Gender: {createAccountGender == 1 ? "Male" : "Female"}
                <br />
                Date of Birth: {createAccountDOB}
                <br />
                Agree to Terms: {createAccountAgreeToTerms ? "Yes" : "No"}
                <hr />
                Create account status: {createAccount ? "Success" : "Failure"}
            </div>
        </div>
    );
};

export default CreateAccountAPIData;
