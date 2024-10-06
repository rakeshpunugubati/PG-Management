import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"


function ResetPassword() {
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [wait, setWait] = useState(false)
  const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
		setWait(true);
    try{
      const response = await axios.post("http://localhost:5000/resetpassword", {password}, { withCredentials: true });
      if(response.status === 200){
        console.log(response.data.message);
        navigate('/');
      }
    }catch(error){
      if(error.response.status === 403){
        navigate('/forgotpassword')
      }
      console.log(error.response.data.message);
    }

    setWait(false)
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
		<div className="w-full h-screen flex flex-col justify-center items-center  text-gray-700">
			<h1 className="mb-10 text-5xl font-bold">Change Password</h1>
			<form
				onSubmit={handleSubmit}
				className="w-full sm:w-1/3 p-10 sm:p-0 mb-4"
			>
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
					className={`text-xl text-black w-full p-2 ${
						wait ? "bg-green-400" : "bg-green-500"
					} rounded-md`}
				>
					Reset
				</button>
			</form>
		</div>
	)
}

export default ResetPassword
