import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function ForgotPassword() {
	const [email, setEmail] = useState("")
	const [wait, setWait] = useState(false)
	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			setWait(true)
			const response = await axios.post(
				"http://localhost:5000/sendotp",
				{ email },
				{ withCredentials: true }
			)
			if (response.status === 200) {
				navigate('/verifyotp')
			}
		} catch (error) {
			if (error.response.status === 404) {
				alert(error.response.data.message)
			} else if (error.response.status === 500) {
				alert("Server error, please try again later.")
			} else {
				alert("An unexpected error occurred.")
			}
		}
		setWait(false)
		setEmail("")
	}
	return (
		<div className="w-full h-screen flex justify-center items-center  text-gray-700">
			<div className="flex flex-col  gap-5 p-10 sm:p-0">
				<h1 className=" text-5xl  font-bold ">Forgot Password?</h1>
				<p>
					Don't worry! It occurs. Please enter your <br />
					registered email Id.
				</p>
				<form onSubmit={handleSubmit} className="sm:w-3/4  ">
					<div className="text-xl flex flex-col mb-4">
						<label htmlFor="email" className="mb-1">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter your emailId"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full border border-gray-300 p-2 rounded"
							required
						/>
					</div>

					<button
						type="submit"
						disabled={wait}
						className="text-xl text-black w-full mt-4 p-2 bg-green-500 rounded-md"
					>
						Send OTP
					</button>
				</form>
			</div>
		</div>
	)
}

export default ForgotPassword
