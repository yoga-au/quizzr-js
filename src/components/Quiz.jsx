import React, { useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
// import component
import QuizContent from './QuizContent'

const Quiz = () => {
	// define state for category select component
	const [category, setCategory] = useState(null)
	// define state for difficulty select component
	const [diff, setDiff] = useState(null)
	// define state for quiz data from response from OpenTrivia API
	const [quizData, setQuizData] = useState([])
	// define state for condition of the game (is the game starting or not)
	const [startGame, setStartGame] = useState(false)

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
				const data = res.data.results

				setQuizData(data.map(el => {
					// return an copy of object from resuls properties from OpenTrivia API
					// so I can merge the correct answer and incorrect answer
					// since they're separated
					return {
						category: el.category,
						type: el.type,
            difficulty: el.difficulty,
						question: el.question,
						answers: [...el.incorrect_answers, el.correct_answer],
            correct_answer: el.correct_answer,
            incorrect_answers: el.incorrect_answers
					}
				}))
			})

		// change startGame condition to true. When user press start it means the game is starting
		setStartGame(true)
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

			{ startGame !== false && (
				<QuizContent data={ quizData } />
			)}
		</div>
	)
}

export default Quiz
