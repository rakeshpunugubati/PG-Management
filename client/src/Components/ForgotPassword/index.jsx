import React, { useState } from "react"
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
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
				navigate("/verifyotp")
			}
		} catch (error) {
			if (error.response) {
				alert(error.response.data.message)
			} else {
				alert("Network error, please try again later.")
			}
		} finally {
			setWait(false)
			setEmail("")
		}
	}
	return (
		<div className="w-full h-screen flex justify-center items-center  text-gray-800">
			<NavLink to="/login">
				<FontAwesomeIcon
					icon={faCircleArrowLeft}
					size="xl"
					className="text-gray-500 absolute p-10 top-0 left-0"
				/>
			</NavLink>
			<div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-10 sm:p-8 rounded-lg shadow-md flex flex-col gap-5">
				<h1 className=" text-5xl  font-bold ">Forgot Password?</h1>
				<p>
					Don't worry! It occurs. Please enter your <br />
					registered email Id.
				</p>
				<form onSubmit={handleSubmit}>
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
						className="text-xl bg-green-500 w-full text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-300"
					>
						Send OTP
					</button>
				</form>
			</div>
		</div>
	)
}

export default ForgotPassword
