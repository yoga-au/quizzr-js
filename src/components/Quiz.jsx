import React, { useState } from 'react'
import Select from 'react-select'
import axios from 'axios'

const Quiz = () => {
	// define state for category select component
	const [category, setCategory] = useState(null)
	// define state for difficulty select component
	const [diff, setDiff] = useState(null)
	// define state for quiz data from response from OpenTrivia API
	const [quizData, setQuizData] = useState(null)

	// define options in react-select 'Select' component
	const categoryOptions = [
		{ value: '17', label: 'Science and Nature' },
		{ value: '19', label: 'Mathematics' },
		{ value: '15', label: 'Video Games' }
	]

	// define options in react-select 'Select' component
	const diffOptions = [
		{ value: 'easy', label: 'Easy' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'hard', label: 'Hard' }
	]

	// send request to OpenTrivia API
	const handleStart = (ev) => {
		ev.preventDefault()
		// for debugging
		// console.log(category.value)
		// console.log(diff.value)

		axios.get(`https://opentdb.com/api.php?amount=10&category=${category.value}&difficulty=${diff.value}&type=multiple`)
			.then((res) => {
				// console.log(res.data.results)
				setQuizData(res.data.results)
			})
	}

	return (
		<div>
			<h1>Quiz App</h1>
			{/* for debugging
			{ console.log(category) }
			{ console.log(diff) }
			console.log(quizData) */
			}

			<form onSubmit={ handleStart }>
				<p>Choose Category</p>
				<Select
					defaultValue={ category }
					onChange={ setCategory }
					options={ categoryOptions }
				/>

				<p>Choose Difficulty</p>
				<Select
					defaultValue={ diff }
					onChange= { setDiff }
					options={ diffOptions }
				/>

				<button>Start Game</button>
			</form>
		</div>
	)
}

export default Quiz
