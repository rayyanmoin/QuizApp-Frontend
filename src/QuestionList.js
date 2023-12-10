import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";

const QuestionList = () => {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get("http://localhost:8080/question/allQuestions");
				setQuestions(response.data);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		fetchQuestions();
	}, []);

	const columnDefs = [
        { headerName : "S.no" , field: "id" , width: 100 },
        { headerName : "Category" , field:"category" , width: 150 },
		{ headerName: "Difficulty Level", field: "difficultyLevel", width: 150 },
		{
			headerName: "Question",
			field: "question",
			flex: 1,
			cellStyle: { whiteSpace: "normal" }, // Enable text wrapping
			autoHeight: true, // Auto-adjust row height based on content
		},
	];

	return (
		<div className="ag-theme-alpine" style={{ height: "550px", width: "1000px", margin: "0 auto" }}>
			<h1>Questions List</h1>
			<AgGridReact columnDefs={columnDefs} rowData={questions} pagination={true} paginationPageSize={10} />
		</div>
	);
};

export default QuestionList;
