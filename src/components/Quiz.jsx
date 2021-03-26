import React, { useState } from 'react'
import Select from 'react-select'
import axios from 'axios'

const Quiz = () => {
	const [category, setCategory] = useState(null)
	const [diff, setDiff] = useState(null)

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
	return (
		<div>
			<h1>Quiz App</h1>
			{/* for debugging
			{ console.log(category) }
			{ console.log(diff) } */}

			<form>
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
