import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
function index() {
	const [userId, setUserId] = useState("")
  const [wait, setWait] = useState(false);
  const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault();

    try{
      setWait(true)
      const response = await axios.post('http://localhost:5000/sendotp', {userId});
      if(response.status === 200){
        navigate('/otpverification')
      }
    }
    catch(error){
      if (error.response.status === 404) {
        alert(error.response.data.message);
      } else if (error.response.status === 500) {
          alert("Server error, please try again later.");
      } else {
          alert("An unexpected error occurred.");
      }

    }
    setWait(false);
		setUserId("");
	}
	return (
		<div className="w-full h-screen flex justify-center items-center  text-gray-700">
			<div className="flex flex-col  gap-5 p-10 sm:p-0">
				<h1 className=" text-5xl  font-bold ">Forgot Password?</h1>
				<p>
					Don't worry! It occurs. Please enter your registered mobile
					number
				</p>
				<form  onSubmit={handleSubmit} className="sm:w-3/4  ">
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
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						className="w-full border border-gray-300 p-2 my-4 rounded"
						required
					/>

					<button
						type="submit"
            disabled ={wait}
						className="text-xl text-black w-full mt-4 p-2 bg-green-500 rounded-md"
					>
						Send OTP
					</button>
				</form>
			</div>
		</div>
	)
}

export default index
