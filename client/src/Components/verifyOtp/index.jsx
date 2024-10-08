import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
function VerifyOtp({ n = 6 }) {
	const [otp, setOtp] = useState(new Array(n).fill(""))
	const [verifyOtp, setVerifyOtp] = useState("")
	const ref = useRef([])
	const [loading, setLoading] = useState(true)
	const [wait, setWait] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async () => {
		setWait(true)
		try {
			const response = await axios.post(
				"http://localhost:5000/verifyotp",
				{ userOtp: verifyOtp },
				{ withCredentials: true }
			)
			if (response.status === 200) {
				navigate("/resetpassword")
			}
		} catch (error) {
			if (error.response) {
				if (error.response.status === 400) {
					alert(error.response.data.message)
				} else if (error.response.status === 401) {
					alert(error.response.data.message)
					navigate("/forgotpassword")
				} else {
					alert(error.response.data.message)
				}
			} else {
				alert("Network error, please try again later.")
			}
		} finally {
			setWait(false)
		}
	}

	const handleKeyDown = (e, index) => {
		const key = e.key
		if (key === "Backspace" && !otp[index] && index > 0) {
			ref.current[index - 1].focus()
		}
	}

	const handleChange = (value, index) => {
		if (isNaN(value)) return
		let newOtp = [...otp]
		newOtp[index] = value[value.length - 1]
		if (value && index < otp.length - 1) {
			ref.current[index + 1].focus()
		}
		setOtp(newOtp)
		setVerifyOtp(newOtp.join(""))
	}

	useEffect(() => {
		const checkOtpAccess = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/verifyotp",
					{ withCredentials: true }
				)
				console.log(response)
				setLoading(false)

				if (ref.current[0]) {
					ref.current[0].focus()
				}
			} catch (error) {
				if (error.response) {
					alert(error.response.data.message);
					navigate("/forgotpassword")
				} else {
					alert.console.log("Network error, please try again later.")
				}
			}
		}
		checkOtpAccess()
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}
	return (
		<div className="w-full h-screen flex  justify-center items-center  text-gray-800 ">
			<div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-10 sm:p-8 rounded-lg shadow-md flex flex-col gap-5">
				<h1 className=" w-full  text-5xl font-bold">
					OTP Verification
				</h1>
				<p>Enter the verification code we just sent to your email Id</p>

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
								className="w-12 h-12 sm:w-14 sm:h-14 text-2xl text-center  m-1 border-2 focus:outline-green-500 border-gray-400 rounded-md"
							/>
						)
					})}
				</div>
				<button
					disabled={wait}
					onClick={handleSubmit}
					className="text-xl bg-green-500 w-full text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-300"
				>
					Verify OTP
				</button>
			</div>
		</div>
	)
}

export default VerifyOtp
