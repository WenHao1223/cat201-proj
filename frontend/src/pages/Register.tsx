import React, { useState } from "react";
import "@styles/LoginRegister.css";
import { getNames } from 'country-list';

const Register: React.FC = () => {
    const [nationality, setNationality] = useState<string>("");

    const handleNationalityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

    return (
        <div className="register-page bg-white text-black">
            <div className="container">
                <div className="header">Chef's Aura</div>
                <div className="form-container">
                    <div className="image-container">
                        <img
                            src="https://www.color-meanings.com/wp-content/uploads/bright-kitchen-stainless-steel-appliances.jpeg"
                            alt="Sample photo"
                            className="img-fluid"
                            style={{
                                width: "600px",
                                height: "500px",
                                borderRadius: "15px",
                            }}
                        />
                    </div>
                    <div className="form-content">
                        <header style={{ textAlign: "center" }}>Sign Up</header>
                        <form action="#" className="form">
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
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
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
                                        placeholder="Date of Birth"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-box">
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    required
                                />
                            </div>
                            <div className="gender-box">
                                <h3>Gender</h3>
                                <div className="gender-option">
                                    <div className="gender">
                                        <input
                                            type="radio"
                                            id="check-male"
                                            name="gender"
                                            value="0"
                                            defaultChecked
                                        />
                                        <label htmlFor="check-male">Male</label>
                                    </div>
                                    <div className="gender">
                                        <input
                                            type="radio"
                                            id="check-female"
                                            name="gender"
                                            value="1"
                                        />
                                        <label htmlFor="check-female">
                                            Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="input-box agree-box">
                                <input type="checkbox" id="agree" required />
                                <label htmlFor="agree">
                                    I agree to the terms and conditions
                                </label>
                            </div>
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
                                    className="btn btn-warning btn-lg ms-2"
                                >
                                    Submit form
                                </button>
                            </div>
                            <div className="text sign-up-text">
                                Already have an account?{" "}
                                <a href="/login">Login here</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
