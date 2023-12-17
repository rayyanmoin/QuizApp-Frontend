import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./CreateQuiz.css"

const CreateQuiz = () => {

      	const [formData, setFormData] = useState({
					title: "",
					category: "",
					numQ: "",
				});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	function hasEmptyValues(obj) {
		return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (hasEmptyValues(formData)) {
				toast.warning("Oops! Please Enter All Details", {
					position: "top-right",
					autoClose: 3000, // 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			} else {
                const response = await axios.post("http://localhost:8080/quiz/create", null, {
	                params: formData
                });
				console.log("Quiz Created successfully:", response.data);
				toast.success("Quiz Created successfully!", {
					position: "top-right",
					autoClose: 4000, // 4 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});

				setFormData({
					title: "",
					category: "",
					numQ: "",
				});
			}
		} catch (error) {
			console.error("Error When Creating Quiz:", error);
			toast.error("Oops! Something went wrong :-(", {
				position: "top-right",
				autoClose: 3000, // 3 seconds
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
	};

	return (
		<div className="modal-content">
			<h1>Create New Quiz</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Title:
					<input type="text" name="title" value={formData.title} onChange={handleChange} />
				</label>
				<label>
					Category:
					<input type="text" name="category" value={formData.category} onChange={handleChange} />
				</label>
				<label>
					No.Of Questions:
					<input type="text" name="numQ" value={formData.numQ} onChange={handleChange} />
				</label>

				<button type="submit">Create It</button>
			</form>
		</div>
	);
};


export default CreateQuiz
