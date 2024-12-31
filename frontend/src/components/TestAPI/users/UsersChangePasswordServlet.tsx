import react from "react";

interface UsersChangePasswordServletProps {
    currentPassword: string;
    newPassword: string;
    changePasswordStatus: boolean;
}

const UsersChangePasswordServlet: react.FC<UsersChangePasswordServletProps> = ({
    currentPassword,
    newPassword,
    changePasswordStatus,
}) => {
    return (
        <div>
            <h2>Change Password</h2>
            <div>
                Current Password: {currentPassword}
                <br />
                New Password: {newPassword}
                <hr />
                Change password status: {changePasswordStatus ? "Success" : "Failure"}
            </div>
        </div>
    );
};

export default UsersChangePasswordServlet;