import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Admin() {
  const [loading , setLoading] = useState(true);
  const navigate = useNavigate()
	useEffect(() => {
    const checkAccess = async() =>{
      try{
        const response = await axios.get("http://localhost:5000/admin", { withCredentials: true })
        if(response.status ===200 ){
          console.log(response.data.message)
        }
        setLoading(false);
      }
      catch(error){
        console.log(error.response.data.message);
        navigate('/')
      }
    }
    checkAccess();
	}, [])
  if(loading){
    return <div>Loading...</div>
  }
	return (
		<div className="w-full h-full text-center text-5xl pt-44">
			Wlecome Back!
		</div>
	)
}

export default Admin
