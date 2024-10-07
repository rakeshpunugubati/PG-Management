import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import Login from "./Components/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from "./ErrorPage"
import Admin from "./Components/Admin"
import ForgotPassword from "./Components/ForgotPassword"
import Register from "./Components/Register"
import VerifyOtp from "./Components/verifyOtp"
import ResetPassword from "./Components/ResetPassword"
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/admin",
				element: <Admin />,
			},
			{
				path: "/forgotpassword",
				element: <ForgotPassword />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/verifyotp",
				element: <VerifyOtp />,
			},
			{
				path: "/resetpassword",
				element: <ResetPassword />,
			},
		],
	},
])
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
