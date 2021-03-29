import React, { useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import shuffle from 'lodash.shuffle'
// import component
import QuizContent from './QuizContent'

const Quiz = () => {
	// define state for category, difficulty,
	// quiz data from OpenTrivia API
	// condition of the game (is the game starting or not)
	// showing error (validate form)

	const [category, setCategory] = useState(null)
	const [diff, setDiff] = useState(null)
	const [quizData, setQuizData] = useState([])
	const [startGame, setStartGame] = useState(false)
	const [showError, setShowError] = useState(false)

	// define options in react-select 'Select' component
	const categoryOptions = [
		{ value: '17', label: 'Science and Nature' },
		{ value: '22', label: 'Geography' },
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
		// console.log(category.value)
		// console.log(diff.value)

		// check if category or diff state are null (validation)
		if (category === null || diff === null) {
			setShowError(true)
			return
		}

		// if there is data in category and diff state, continue
		setShowError(false)

		axios.get(`https://opentdb.com/api.php?amount=10&category=${category.value}&difficulty=${diff.value}&type=multiple`)
			.then((res) => {
				// console.log(res.data.results)
				const data = res.data.results

				// note: better to manipulate any data you want to pass to children in the parent
				// since the data in props are read-only
				setQuizData(data.map(el => {
					// return an copy of object from resuls properties from OpenTrivia API
					// and then we can merge the correct answer and incorrect answer
					// since they're separated
					return {
						category: el.category,
						type: el.type,
            difficulty: el.difficulty,
						question: el.question,
						answers: shuffle([...el.incorrect_answers, el.correct_answer]),
            correct_answer: el.correct_answer,
            incorrect_answers: el.incorrect_answers
					}
				}))
			})

		// change startGame condition to true. When user press start it means the game is starting
		setStartGame(true)
	}

	return (
		<>
			{startGame === false && (
				<div>
					<h1>Quiz App</h1>
					{/*
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
		
					{showError && (
						<p>Form must be filled</p>
					)}
		
				</div>
			)}
			{ // check if start game button is pressed, prevent error
				// when react try to render QuizContent component
				// while props data doesn't exist
				startGame !== false && (
					<QuizContent
						data={ quizData }
						setStartGame={ setStartGame }
						setQuizData={ setQuizData }
						setCategory={ setCategory }
						setDiff={ setDiff }
					/>
			)}
		</>
	)
}

export default Quiz
