import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./QuizList.css";
import Modal from "react-modal"; 

const QuizList = () => {
	const [quiz, setQuiz] = useState([]);
	const [question, setQuestion] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAttemptModalOpen, setIsAttemptModalOpen] = useState(false);
	const [selectedResponses, setSelectedResponses] = useState({});
	const [rowID, setRowID] = useState(""); // Use state hook for rowID

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get("http://localhost:8080/quiz/allQuiz");
				setQuiz(response.data);
			} catch (error) {
				console.error("Error fetching quiz:", error);
			}
		};

		fetchQuestions();
	}, []);

	useEffect(() => {
		console.log("question", question);
	}, [question]);
	const closeModal = () => {
		// Close the modal
		setIsModalOpen(false);
		setQuestion([]);
	};
	const closeAttemptModal = () => {
		setIsAttemptModalOpen(false);
		setQuestion([]);
		setSelectedResponses({});
		setRowID("");
	};

	const handleViewQuestion = async (rowId) => {
		try {
			const response = await axios.get(`http://localhost:8080/quiz/get/${rowId}`);
			console.log("response", response.data);
			setQuestion(response.data);
			console.log("row Id :-", rowId);
			setIsModalOpen(true);
			// HW
			// Open Modal and view the questions
			// state to be used is question
		} catch (error) {
			console.error("Error fetching question:", error);
			toast.error("Some Error Occured unable to Fetch Quiz Questions!", {
				position: "top-right",
				autoClose: 3000, // 3 seconds
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
	};
	const attemptQuestions = async (rowId) => {
		try {
			const response = await axios.get(`http://localhost:8080/quiz/get/${rowId}`);
			setQuestion(response.data);
			setRowID(rowId); // Update rowID using setRowID
			setIsAttemptModalOpen(true);
		} catch (error) {
			console.error("Error Attempting Quiz:", error);
			toast.error("Some Error Occured unable to Attempt Quiz!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
	};

	const handleSubmit = async () => {
		const apiUrl = `http://localhost:8080/quiz/submit/${rowID}`;
		// Check if all questions have responses
		const hasEmptyResponse = question.some((question) => !selectedResponses[question.id]);

		if (hasEmptyResponse) {
			// Display toaster warning and return without submitting
			toast.warning("Please answer all questions before submitting!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			return;
		}
		const requestData = question.map((question) => ({
			id: question.id,
			response: selectedResponses[question.id],
		}));

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestData),
		};

		try {
			const response = await axios.post(apiUrl, requestData, requestOptions);
			console.log("Quiz Submitted score is:", response);
			toast.success("Quiz Submitted and your Total Score is: " + response.data, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			closeAttemptModal();
		} catch (error) {
			console.error("Error submitting quiz:", error);
			toast.error("Some Error Occurred while submitting the quiz!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
	};

	const columnDefs = [
		{ headerName: "S.no", field: "id", width: 100 },
		{
			headerName: "Title",
			field: "title",
			flex: 1,
			cellStyle: { whiteSpace: "normal" }, // Enable text wrapping
			autoHeight: true, // Auto-adjust row height based on content
		},
		{
			headerName: "Actions",
			width: 120,
			cellRenderer: (params) => (
				<button className="button-quiz-list" onClick={() => handleViewQuestion(params.data.id)}>
					View
				</button>
			),
			colId: "actions", // Add a colId for the column
		},
		{
			headerName: "Attempt Quiz",
			width: 200,
			cellRenderer: (params) => (
				<button className="button-attempt-quiz-list center-button" onClick={() => attemptQuestions(params.data.id)}>
					Attempt Quiz
				</button>
			),
			colId: "attempt",
		},
	];

	return (
		<div
			className="ag-theme-alpine"
			style={{ height: "550px", width: "1000px", margin: "0 auto", fontFamily: "Agency FB", fontSize: "20px" }}
		>
			<h1>Quiz List</h1>
			<AgGridReact columnDefs={columnDefs} rowData={quiz} pagination={true} paginationPageSize={20} />

			<Modal isOpen={isModalOpen} onRequestClose={closeModal} className="Quiz-modal-content" overlayClassName="modal-overlay">
				<h2 style={{ textAlign: "center", margin: "0 auto" }}>Quiz Questions</h2>
				<ol>
					{question.map((questiondata, index) => (
						<li key={index}>{questiondata.question}</li>
					))}
				</ol>

				<button onClick={closeModal}>Close</button>
			</Modal>
			<Modal
				isOpen={isAttemptModalOpen}
				onRequestClose={closeAttemptModal}
				className="modal-attempt-content"
				overlayClassName="modal-attempt-overlay"
			>
			<h2 style={{ textAlign: "center", margin: "0 auto" }}>Attempt Quiz</h2>
			<form>
				<ol>
					{question.map((question, index) => (
						<li key={index}>
							<p>{question.question}</p>
							<ul>
						{Object.keys(question).map((key) => {
							if (key.startsWith("option")) {
								return (
									<li key={key}>
										<label>
											<input
												type="radio"
												name={`question_${question.id}`}
												value={question[key]}
												onChange={() =>
													setSelectedResponses((prevResponses) => ({
														...prevResponses,
														[question.id]: question[key],
													}))
												}
											/>
											{question[key]}
										</label>
											</li>
										);
									}
									return null;
								})}
							</ul>
						</li>
					))}
				</ol>
				<div style={{ textAlign: "center" }}>
					<button type="button" onClick={closeAttemptModal} className="close">
						Close
					</button>
					<button type="button" onClick={handleSubmit} className="submit">
						Submit
					</button>
				</div>
			</form>
			</Modal>
		</div>
	);
};

export default QuizList;
