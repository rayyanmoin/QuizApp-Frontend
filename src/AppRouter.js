import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import 'Routes' instead of 'Switch'
import QuestionList from "./QuestionList";
import NavBar from "./NavBar"; 

import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
	return (
		<Router>
			<ToastContainer />
			<NavBar /> {/* Include the NavBar component */}
			<Routes>
				{" "}
				<Route path="/" element={<Home />} />
				{/* Use 'Routes' instead of 'Switch' */}
				<Route path="/questionlist" element={<QuestionList />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
