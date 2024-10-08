import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
const Home = () => {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Navbar */}
			<nav className="bg-white flex shadow-md w-full gap-2 p-4 lg:px-20">
				<FontAwesomeIcon icon={faHouse} size="2xl" className="text-indigo-700" />
				<div className="container mx-auto flex justify-between items-center">
					<h1 className="text-3xl font-bold text-gray-800">
						PG Management
					</h1>
					<NavLink to="/login">
						<button className="bg-indigo-500 text-white px-5 py-2 rounded-md hover:bg-indigo-600 transition duration-300">
							Login
						</button>
					</NavLink>
				</div>
			</nav>

			{/* Main content */}
			<main className="flex-grow bg-gray-50 flex items-center justify-center">
				<div className="text-center max-w-3xl px-4">
					<h2 className="text-5xl font-extrabold text-gray-800 mb-4">
						Welcome to PG Management
					</h2>
					<p className="text-lg text-gray-600 mb-8">
						Streamline the way you manage your PG business. With our
						easy-to-use tool, you can effortlessly manage room
						assignments, tenant details, and more. Elevate your
						efficiency and maximize your business potential.
					</p>
					<NavLink to="/register">
						<button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-300">
							Get Started
						</button>
					</NavLink>
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-gray-800 text-white py-6">
				<div className="container mx-auto text-center">
					<p className="mb-2">
						&copy; {new Date().getFullYear()} PG Management
					</p>
					<p>All rights reserved</p>
				</div>
			</footer>
		</div>
	)
}

export default Home
