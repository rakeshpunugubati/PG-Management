import React, { useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, NavLink } from "react-router-dom"
function Register() {
	const [user, setUser] = useState({
		propertyName: "",
		userId: "",
		email: "",
		password: "",
		confirmPassword: "",
	})
	const [wait, setWait] = useState(false)
	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			setWait(true)
			const response = await axios.post(
				"http://localhost:5000/register",
				{
					propertyName: user.propertyName,
					userId: user.userId,
					email: user.email,
					password: user.password,
				}
			)
			if (response.status === 201) {
				navigate("/", {
					state: { message: "Registered successfully!" },
				})
			}
		} catch (error) {
			if (error.response) {
				alert(error.response.data.message)
			} else {
				alert("Network error, please try again later.")
			}
		} finally {
			setUser({
				propertyName: "",
				userId: "",
				email: "",
				password: "",
				confirmPassword: "",
			})
			setWait(false)
		}
		
	}

	const validateConfirmPassword = (e) => {
		const confirmPassword = e.target.value
		if (confirmPassword !== user.password) {
			e.target.setCustomValidity("Passwords do not match")
		} else {
			e.target.setCustomValidity("")
		}
	}

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center  text-gray-800">
			<NavLink to="/">
				<FontAwesomeIcon
					icon={faCircleArrowLeft}
					size="xl"
					className="text-gray-500 absolute p-10 top-0 left-0"
				/>
			</NavLink>
			<div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3  p-10 sm:p-8 rounded-lg shadow-md flex flex-col gap-5">
				<h1 className="mb-10 text-5xl font-bold">Register</h1>
				<form onSubmit={handleSubmit}>
					<div className="text-xl flex flex-col mb-4">
						<label htmlFor="propertyName" className="mb-1">
							Property Name:
						</label>
						<input
							type="text"
							name="propertyName"
							id="propertyName"
							placeholder="Enter pg name"
							value={user.propertyName}
							onChange={(e) =>
								setUser({
									...user,
									propertyName: e.target.value,
								})
							}
							className="w-full border border-gray-300 p-2 rounded"
							required
						/>
					</div>
					<div className="text-xl flex flex-col mb-4">
						<label htmlFor="userId" className="mb-1">
							UserId:
						</label>
						<input
							type="tel"
							name="userId"
							id="userId"
							pattern="[6-9]{1}[0-9]{9}"
							maxLength={10}
							inputMode="numeric"
							onInvalid={(e) => {
								e.target.setCustomValidity(
									"Enter a valid mobile number"
								)
							}}
							onInput={(e) => e.target.setCustomValidity("")}
							placeholder="Enter mobile number"
							value={user.userId}
							onChange={(e) =>
								setUser({ ...user, userId: e.target.value })
							}
							className="w-full border border-gray-300 p-2 rounded"
							required
						/>
					</div>

					<div className="text-xl flex flex-col mb-4">
						<label htmlFor="email" className="mb-1">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter your emailId"
							value={user.email}
							onChange={(e) =>
								setUser({ ...user, email: e.target.value })
							}
							className="w-full border border-gray-300 p-2 rounded"
							required
						/>
					</div>

					<div className="text-xl flex flex-col mb-4">
						<label htmlFor="password" className="mb-1">
							Password:
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={user.password}
							placeholder="Enter Password"
							onChange={(e) =>
								setUser({ ...user, password: e.target.value })
							}
							className="w-full border border-gray-300 p-2 rounded"
							required
						/>
					</div>

					<div className="text-xl flex flex-col mb-8">
						<label htmlFor="confirmPassword" className="mb-1">
							Confirm Password:
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={user.confirmPassword}
							placeholder="Confirm Password"
							onChange={(e) => {
								setUser({
									...user,
									confirmPassword: e.target.value,
								})
								validateConfirmPassword(e) // Validate on change
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
						Register
					</button>
				</form>
			</div>
		</div>
	)
}

export default Register
