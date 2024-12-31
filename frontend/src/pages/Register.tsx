import React, { useState } from "react";
import "../App.css";

const Register: React.FC = () => {
    const [nationality, setNationality] = useState("");
    const [isOtherSelected, setIsOtherSelected] = useState(false);

    const handleNationalityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setNationality(value);
        setIsOtherSelected(value === "Other");
    };

    return (
        <div className="register-page">
            <div className="container">
            <div className="header">Chef's Aura</div>
                <div className="form-container">
                    <div className="image-container">
                    <img
                        src="https://www.color-meanings.com/wp-content/uploads/bright-kitchen-stainless-steel-appliances.jpeg"
                        alt="Sample photo"
                        className="img-fluid"
                        style={{ width: "600px", height: "500px", borderRadius: "15px" }}
                    />
                    </div>
                    <div className="form-content">
                        <header style={{ textAlign: "center" }}>Sign Up</header>
                        <form action="#" className="form">
                            <div className="flex-container">
                                <div className="input-box">
                                    <div className="form-outline">
                                        <input type="text" id="firstName" className="form-control form-control-lg" placeholder="First Name" required />
                                    </div>
                                </div>
                                <div className="input-box">
                                    <div className="form-outline">
                                        <input type="text" id="lastName" className="form-control form-control-lg" placeholder="Last Name" required />
                                    </div>
                                </div>
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Username" required />
                            </div>
                            <div className="input-box">
                                <input type="email" placeholder="Email Address" required />
                            </div>
                            <div className="input-box">
                                <input type="password" placeholder="Password" required />
                            </div>
                            <div className="flex-container">
                                <div className="input-box">
                                <select value={nationality} onChange={handleNationalityChange} required className="scrollable-select">
                                    <option value="" disabled hidden>Select Nationality</option>
                                    <option value="Malaysian">Malaysian</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Nepalese">Nepalese</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Russian">Russian</option>
                                    <option value="Other">Other</option>
                                </select>
                                </div>
                                {isOtherSelected && (
                                    <div className="input-box">
                                        <input type="text" placeholder="Please specify your nationality" required />
                                    </div>
                                )}
                                {!isOtherSelected && nationality && (
                                    <div className="input-box">
                                        <input type="text" value={nationality} placeholder="Nationality" readOnly />
                                    </div>
                                )}
                                <div className="input-box">
                                    <input type="date" placeholder="Date of Birth" required />
                                </div>
                            </div>
                            <div className="input-box">
                                <input type="tel" placeholder="Phone Number" required />
                            </div>
                            <div className="gender-box">
                                <h3>Gender</h3>
                                <div className="gender-option">
                                    <div className="gender">
                                        <input type="radio" id="check-male" name="gender" value="0" defaultChecked />
                                        <label htmlFor="check-male">Male</label>
                                    </div>
                                    <div className="gender">
                                        <input type="radio" id="check-female" name="gender" value="1" />
                                        <label htmlFor="check-female">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className="input-box agree-box">
                                <input type="checkbox" id="agree" required />
                                <label htmlFor="agree">I agree to the terms and conditions</label>
                            </div>
                            <div className="button-container">
                                <button type="button" className="btn btn-light btn-lg">Reset all</button>
                                <button type="submit" className="btn btn-warning btn-lg ms-2">Submit form</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;