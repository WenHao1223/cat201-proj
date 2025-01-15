import React, { useState } from "react";
import { getNames } from "country-list";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

import "@styles/LoginRegister.css";
import { UserInterface } from "@interfaces/API/UserInterface";
import handleApiCall from "@utils/handleApiCall";

interface RegisterProps {
    isLogin: boolean;
}

const Register: React.FC<RegisterProps> = ({ isLogin }) => {
    const navigate = useNavigate();
    const [craeteAccountObject, setCreateAccountObject] =
        useState<UserInterface>({
            username: "",
            email: "",
            password: "",
            nationality: "",
            firstName: "",
            lastName: "",
            phoneNo: "",
            gender: 0,
            dob: "",
            agreeToTerms: false,
        });
    const [createAccountStatus, setCreateAccountStatus] =
        useState<boolean>(false);
    const [error, setError] = useState("" as string | null);

    const [nationality, setNationality] = useState<string>("");

    const handleNationalityChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setNationality(event.target.value);
    };

    const countryOptions = getNames().sort();

    const resetAll = () => {
        const inputFields = document.querySelectorAll("input");
        inputFields.forEach((input) => {
            input.value = "";
        });

        const selectField = document.querySelector("select");
        if (selectField) {
            (selectField as HTMLSelectElement).selectedIndex = 0;
        }

        const checkboxField = document.querySelector("input[type='checkbox']");
        if (checkboxField) {
            (checkboxField as HTMLInputElement).checked = false;
        }

        const radioField = document.querySelector("input[type='radio']");
        if (radioField) {
            (radioField as HTMLInputElement).checked = false;
        }
    };

    const createUserAccountMethod = async (
        username: string,
        email: string,
        password: string,
        nationality: string,
        firstName: string,
        lastName: string,
        phoneNo: string,
        gender: number,
        dob: string,
        agreeToTerms: boolean
    ) => {
        setCreateAccountObject({
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
        });

        await handleApiCall(
            "users/create",
            "POST",
            {
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
            },
            async (result) => {
                if ((await result.status) === "Success") {
                    setCreateAccountStatus(true);
                    setError(null);
                    Swal.fire({
                        title: "Account created successfully",
                        text: "You can now login to your account. Redirecting to login page...",
                        icon: "success",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#3085d6",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        showConfirmButton: true,
                        showCancelButton: false,
                        showCloseButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    }).then(() => {
                        navigate("/login");
                    });
                } else {
                    setError("\n Error creating account: " + result.message);
                }
            },
            (error) => setError("\n Error creating account: " + error)
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createUserAccountMethod(
            (document.getElementById("username") as HTMLInputElement).value,
            (document.getElementById("email") as HTMLInputElement).value,
            (document.getElementById("password") as HTMLInputElement).value,
            nationality,
            (document.getElementById("firstName") as HTMLInputElement).value,
            (document.getElementById("lastName") as HTMLInputElement).value,
            (document.getElementById("phoneNo") as HTMLInputElement).value,
            parseInt(
                (
                    document.querySelector(
                        "input[name='gender']:checked"
                    ) as HTMLInputElement
                ).value
            ),
            (document.getElementById("dob") as HTMLInputElement).value,
            (document.getElementById("agreeToTerms") as HTMLInputElement)
                .checked
        );
    };

    if (isLogin) {
        navigate("/main");
    }

    return (
        <div className="bg-white text-black min-h-screen flex items-center justify-center">
            <div className="container">
                <Link to="/">
                    <div className="header">Chef's Aura</div>
                </Link>
                <div className="form-container">
                    <div className="image-container">
                        <img
                            src="https://www.color-meanings.com/wp-content/uploads/bright-kitchen-stainless-steel-appliances.jpeg"
                            alt="Sample photo"
                            className="img-fluid object-cover"
                            style={{
                                width: "600px",
                                height: "500px",
                                borderRadius: "15px",
                            }}
                        />
                    </div>
                    <div className="form-content">
                        <header style={{ textAlign: "center" }}>Sign Up</header>
                        <form
                            action="#"
                            className="form"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex-container">
                                <div className="input-box">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            id="firstName"
                                            className="form-control form-control-lg"
                                            placeholder="First Name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="input-box">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            id="lastName"
                                            className="form-control form-control-lg"
                                            placeholder="Last Name"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email Address"
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="flex-container">
                                <div className="input-box">
                                    <select
                                        value={nationality}
                                        onChange={handleNationalityChange}
                                        required
                                        className="scrollable-select"
                                    >
                                        <option value="" disabled hidden>
                                            -- Select Country --
                                        </option>
                                        {countryOptions.map((country) => (
                                            <option
                                                key={country}
                                                value={country}
                                            >
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-box">
                                    <input
                                        type="date"
                                        id="dob"
                                        placeholder="Date of Birth"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-box">
                                <input
                                    type="tel"
                                    id="phoneNo"
                                    placeholder="Phone Number"
                                    required
                                />
                            </div>
                            <div className="gender-box pb-2">
                                <h3>Gender</h3>
                                <div className="gender-option">
                                    <div className="gender">
                                        <input
                                            type="radio"
                                            id="check-male"
                                            name="gender"
                                            value="1"
                                            defaultChecked
                                        />
                                        <label htmlFor="check-male">Male</label>
                                    </div>
                                    <div className="gender">
                                        <input
                                            type="radio"
                                            id="check-female"
                                            name="gender"
                                            value="2"
                                        />
                                        <label htmlFor="check-female">
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="input-box agree-box">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    required
                                    className="h-5 w-5"
                                />
                                <label htmlFor="agreeToTerms" className="ml-1 mt-2">
                                    I agree to the terms and conditions
                                </label>
                            </div>
                            {error && (
                                <div className="text-red-500 pt-4">{error}</div>
                            )}
                            <div className="button-container">
                                <button
                                    type="button"
                                    onClick={resetAll}
                                    className="btn btn-light btn-lg"
                                >
                                    Reset all
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-gray-500 text-white btn-lg ms-2"
                                >
                                    Submit form
                                </button>
                            </div>
                            <div className="text sign-up-text mt-4">
                                Already have an account?{" "}
                                <Link to="/login">Log in now</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
