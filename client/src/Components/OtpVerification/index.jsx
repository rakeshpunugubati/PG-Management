import axios from "axios";
import React, { useEffect, useRef, useState } from "react"

function OtpVerification({ n = 6 }) {
	const [otp, setOtp] = useState(new Array(n).fill(""))
    const[verifyOtp , setVerifyOtp] = useState('');
	const ref = useRef([])

    const handleSubmit = async() =>{

        try{
            const response = axios.post('',{otp:verifyOtp})
        }
        catch(error){

        }
    }

	const handleKeyDown = (e, index) => {
		const key = e.key
		if (key === "Backspace" && !otp[index] &&  index > 0) {
			ref.current[index-1].focus();
		}
	}

	const handleChange = (value, index) => {
		if (isNaN(value)) return;
		let newOtp = [...otp]
		newOtp[index] = value[value.length - 1]
		if (value && index < otp.length - 1) {
			ref.current[index + 1].focus()
		}
		setOtp(newOtp);
        setVerifyOtp(newOtp.join(''));
	}

	useEffect(() => {
		if (ref.current[0]) {
			ref.current[0].focus()
		}
	}, [])

	return (
		<div className="w-full h-screen flex  justify-center items-center  text-gray-700 ">
			<div className="flex flex-col  gap-5 p-10 sm:p-0">
				<h1 className=" w-full  text-5xl font-bold">
					OTP Verification
				</h1>
				<p>
					Enter the verification code we just sent to your mobile
					number
				</p>

				<div className=" w-full flex justify-center">
					{otp.map((value, index) => {
						return (
							<input
								type="text"
								key={index}
								ref={(currentInput) =>
									(ref.current[index] = currentInput)
								}
								value={value || ""}
								onKeyDown={(e) => handleKeyDown(e, index)}
								onChange={(e) =>
									handleChange(e.target.value, index)
								}
								className="w-12 h-12 p-2 m-1 border-2 focus:outline-green-500 border-gray-400 rounded-md"
							/>
						)
					})}
				</div>
                <button onSubmit={handleSubmit} className="text-xl text-black w-full p-2 bg-green-500 rounded-md">Verify OTP</button>
			</div>
		</div>
	)
}

export default OtpVerification
