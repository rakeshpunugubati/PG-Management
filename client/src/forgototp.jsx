import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from './firebase'; // Import your Firebase configuration
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

function ForgotPasswordWithOtp() {
    const [userId, setUserId] = useState("");
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [verifyOtp, setVerifyOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const ref = useRef([]);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const phoneNumber = userId; // Assuming userId is the phone number
        const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        try {
            const response = await axios.post('http://localhost:5000/sendotp', { userId });
            if (response.status === 200) {
                const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
                setConfirmationResult(confirmationResult);
                setIsOtpSent(true);
            }
        } catch (error) {
            if (error.response.status === 404) {
                alert(error.response.data.message);
            } else if (error.response.status === 500) {
                alert("Server error, please try again later.");
            } else {
                alert("An unexpected error occurred.");
            }
        }
    };

    const handleSubmitOtp = async (e) => {
        e.preventDefault();
        try {
            await confirmationResult.confirm(verifyOtp);
            alert("OTP verified successfully!");
            // You can navigate to the next page or perform additional actions here
        } catch (error) {
            alert("Invalid OTP. Please try again.");
            console.error("Error verifying OTP: ", error);
        }
    };

    const handleKeyDown = (e, index) => {
        const key = e.key;
        if (key === "Backspace" && !otp[index] && index > 0) {
            ref.current[index - 1].focus();
        }
    };

    const handleChange = (value, index) => {
        if (isNaN(value)) return;
        let newOtp = [...otp];
        newOtp[index] = value[value.length - 1];
        if (value && index < otp.length - 1) {
            ref.current[index + 1].focus();
        }
        setOtp(newOtp);
        setVerifyOtp(newOtp.join(''));
    };

    useEffect(() => {
        if (ref.current[0]) {
            ref.current[0].focus();
        }
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center text-gray-700 ">
            <div className="flex flex-col gap-5 p-10 sm:p-0">
                <h1 className="w-full text-5xl font-bold">{isOtpSent ? "OTP Verification" : "Forgot Password?"}</h1>
                <p>
                    {isOtpSent
                        ? "Enter the verification code we just sent to your mobile number"
                        : "Don't worry! It occurs. Please enter your registered mobile number."}
                </p>

                {!isOtpSent ? (
                    <form onSubmit={handleSendOtp} className="sm:w-3/4">
                        <input
                            type="tel"
                            name="userId"
                            id="userId"
                            pattern="[6-9]{1}[0-9]{9}"
                            maxLength={10}
                            inputMode="numeric"
                            onInvalid={(e) => e.target.setCustomValidity("Enter a valid mobile number")}
                            onInput={(e) => e.target.setCustomValidity("")}
                            placeholder="Enter mobile number"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full border border-gray-300 p-2 my-4 rounded"
                            required
                        />
                        <button
                            type="submit"
                            className="text-xl text-black w-full mt-4 p-2 bg-green-500 rounded-md"
                        >
                            Send OTP
                        </button>
                    </form>
                ) : (
                    <div className="w-full flex flex-col items-center">
                        <div className="w-full flex justify-center mb-4">
                            {otp.map((value, index) => {
                                return (
                                    <input
                                        type="text"
                                        key={index}
                                        ref={(currentInput) => (ref.current[index] = currentInput)}
                                        value={value || ""}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onChange={(e) => handleChange(e.target.value, index)}
                                        className="w-12 h-12 p-2 m-1 border-2 focus:outline-green-500 border-gray-400 rounded-md"
                                    />
                                );
                            })}
                        </div>
                        <button onClick={handleSubmitOtp} className="text-xl text-black w-full p-2 bg-green-500 rounded-md">Verify OTP</button>
                    </div>
                )}
            </div>
            {/* Recaptcha container for Firebase */}
            <div id="recaptcha-container" style={{ display: 'none' }}></div>
        </div>
    );
}

export default ForgotPasswordWithOtp;
