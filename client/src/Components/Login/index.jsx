import React, { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCircleArrowLeft} from '@fortawesome/free-solid-svg-icons'
import "./styles.css"
function Login() {
	const [user, setUser] = useState({ userId: "", password: "" })
	const [wait, setWait] = useState(false)
	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			setWait(true)
			const response = await axios.post(
				"http://localhost:5000/login",
				user,
				{ withCredentials: true }
			)

			if (response.status === 200) {
				console.log(response.data.message)
				navigate("/admin")
			}
		} catch(error) {
			if (error.response) {
				alert(error.response.data.message)
			}else {
				alert("Network error, please try again later.");
			}
		} finally{
			setWait(false)
			setUser({
				userId: "",
				password: "",
			})
		}
		
	}
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center text-gray-800 ">
			<NavLink to = '/'>
				<FontAwesomeIcon icon={faCircleArrowLeft} size="xl" className="text-gray-500 absolute p-10 top-0 left-0" />
			</NavLink>
			<div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-10 sm:p-8 rounded-lg shadow-md flex flex-col gap-5">
				<h1 className="mb-10 text-5xl font-bold">Login</h1>
				<form onSubmit={handleSubmit}>
					<div className="text-xl flex flex-col mb-4">
						<label htmlFor="userId" className="mb-1 ">
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

					<div className="text-xl flex flex-col mb-8 ">
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
						<NavLink
							to="/forgotpassword"
							className="text-end text-sm hover:underline"
						>
							ForgotPassword?
						</NavLink>
					</div>

					<button
						type="submit"
						disabled={wait}
						className="text-xl w-full bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-300"
					>
						Login
					</button>
				</form>
				<div className="text-sm">
					Don't have an account?
					<NavLink to="/register" className="hover:underline">
						{" "}
						Register Now
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default Login
