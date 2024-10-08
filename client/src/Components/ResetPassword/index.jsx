import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ResetPassword() {
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [wait, setWait] = useState(false)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const checkOtpAccess = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/resetpassword",
					{ withCredentials: true }
				)
				console.log(response.data.message)
			} catch (error) {
				if (error.response) {
					if (error.response.status === 401) {
						alert(error.response.data.message)
						navigate("/forgotpassword")
					} else {
						alert(error.response.data.message)
					}
				} else {
					alert("Network error, please try again later.")
				}
			} finally {
				setLoading(false)
			}
		}
		checkOtpAccess()
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		setWait(true)
		try {
			const response = await axios.post(
				"http://localhost:5000/resetpassword",
				{ password },
				{ withCredentials: true }
			)
			if (response.status === 200) {
				console.log(response.data.message)
				alert(response.data.message)
				navigate("/login")
			}
		} catch (error) {
			if (error.response) {
				if (error.response.status === 401) {
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
	const validateConfirmPassword = (e) => {
		const confirmPassword = e.target.value
		if (confirmPassword !== password) {
			e.target.setCustomValidity("Password do not match")
		} else {
			e.target.setCustomValidity("")
		}
	}
	return (
		<div className=" w-full h-screen flex justify-center items-center">
			<div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-10 sm:p-8  rounded-lg shadow-md flex flex-col gap-5">
				<h1 className="mb-10 text-5xl font-bold">Change Password</h1>
				<form onSubmit={handleSubmit} className="">
					<div className="text-xl flex flex-col mb-4">
						<label htmlFor="password" className="mb-1">
							Password:
						</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Enter Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full border border-gray-300 p-2 rounded"
							required
						/>
					</div>
					<div className="text-xl flex flex-col mb-4">
						<label htmlFor="changePassword" className="mb-1">
							Confirm Password:
						</label>
						<input
							type="password"
							id="changePassword"
							name="changePassword"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value)
								validateConfirmPassword(e)
							}}
							className="w-full border border-gray-300 p-2 rounded"
							required
						/>
					</div>
					<button
						type="submit"
						disabled={wait}
						className="text-xl bg-green-500 w-full text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-300"
					>
						Reset
					</button>
				</form>
			</div>
		</div>
	)
}

export default ResetPassword
