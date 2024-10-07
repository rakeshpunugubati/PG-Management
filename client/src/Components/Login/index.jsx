import React, { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import "./styles.css"
function Login() {
	const [user, setUser] = useState({ userId: "", password: "" })
	const [wait, setWait] = useState(false)
  const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			setWait(true)
			const response = await axios.post("http://localhost:5000/login", user, {withCredentials: true})
			
      if(response.status === 200){
        alert(response.data.message)
        navigate('/admin');
      }
		} catch (error) {
      if( error.response.status === 404){
        alert(error.response.data.message)
      }else if(error.response.status === 404){
        alert(error.response.data.message)
      }else{
        alert(error.response.data.message)
      }
		}
		setWait(false)
		setUser({
			userId: "",
			password: "",
		})
	}
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center text-gray-700 ">
			<h1 className="mb-10 text-5xl font-bold">Login</h1>
			<form
				onSubmit={handleSubmit}
				className="w-full sm:w-1/3 p-10 sm:p-0 mb-4"
			>
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
					className="text-xl text-black w-full p-2 bg-green-500 rounded-md"
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
	)
}

export default Login
