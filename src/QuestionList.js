import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CategoryFilter, DifficultyFilter } from "ag-grid-react";

import "./QuestionList.css";

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

	const handleDelete = async (rowId) => {
		try {
			await axios.delete(`http://localhost:8080/question/delete/${rowId}`);
			toast.success("Question deleted successfully!", {
				position: "top-right",
				autoClose: 3000, // 3 seconds
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});

			const updatedQuestions = questions.filter((question) => question.id !== rowId);
			setQuestions(updatedQuestions);
		} catch (error) {
			console.error("Error deleting question:", error);

			if (error.response && error.response.status === 500) {
				toast.error("Internal server error. Please try again later.", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			} else {
				toast.error("Error deleting question. Please try again later.", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			}
		}
	};

	const columnDefs = [
		{ headerName: "S.no", field: "id", width: 100 },
		{ headerName: "Category", field: "category", width: 150, filter: "CategoryFilter" },
		{ headerName: "Difficulty Level", field: "difficultyLevel", width: 150, filter: "DifficultyFilter" },
		{
			headerName: "Question",
			field: "question",
			flex: 1,
			cellStyle: { whiteSpace: "normal" }, // Enable text wrapping
			autoHeight: true, // Auto-adjust row height based on content
		},
		{
			headerName: "Actions",
			width: 120,
			cellRenderer: (params) => (
				<button className="button-question-list" onClick={() => handleDelete(params.data.id)}>
					ᴅᴇʟᴇᴛᴇ
				</button>
			),
			colId: "actions", // Add a colId for the column
		},
	];

	return (
		<div
			className="ag-theme-alpine"
			style={{ height: "550px", width: "1000px", margin: "0 auto", fontFamily: "Agency FB", fontSize: "20px" }}
		>
			<h1>Questions List</h1>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={questions}
				pagination={true}
				paginationPageSize={20}
				frameworkComponents={{ CategoryFilter: CategoryFilter, DifficultyFilter: DifficultyFilter }}
			/>
		</div>
	);
};

export default QuestionList;
