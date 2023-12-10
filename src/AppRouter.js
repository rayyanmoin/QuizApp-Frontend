import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import 'Routes' instead of 'Switch'
import QuestionList from "./QuestionList";
import NavBar from "./NavBar"; 

const AppRouter = () => {
	return (
		<Router>
			<NavBar /> {/* Include the NavBar component */}
			<Routes>
				{" "}
				{/* Use 'Routes' instead of 'Switch' */}
				<Route path="/questionlist" element={<QuestionList />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
