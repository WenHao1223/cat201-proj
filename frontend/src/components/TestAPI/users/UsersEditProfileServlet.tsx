import react from "react";
import { UserGeneralDetailsInterface } from "@interfaces/API/UserInterface";

interface UsersEditProfileServletProps {
    field: string;
    value: string;
    editProfileStatus: boolean;
    currentUserGeneralDetails: UserGeneralDetailsInterface | null;
}

const UsersEditProfileServlet: react.FC<UsersEditProfileServletProps> = ({
    field,
    value,
    editProfileStatus,
    currentUserGeneralDetails,
}) => {
    return (
        <div>
            <h2>Edit Profile</h2>
            <div>
                Field To Edit: {field}
                <br />
                Value: {value}
                <hr />
                Edit profile status: {editProfileStatus ? "Success" : "Failure"}
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
                    <p>Role: {currentUserGeneralDetails.role}</p>
                    <p>Date of Birth: {currentUserGeneralDetails.dob}</p>
                    <p>Nationality: {currentUserGeneralDetails.nationality}</p>
                </div>
            )}
        </div>
    );
};

export default UsersEditProfileServlet;
