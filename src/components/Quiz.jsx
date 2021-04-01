import React, { useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import shuffle from 'lodash.shuffle'

// import component
import QuizContent from './QuizContent'

// import styled component
import {
	QuizTitle,
	FormLabel,
	StartButton,
	Loading,
	AnswerCheckContainer
} from '../styles/StyledComponent'

// import custom style for react-select
import { customStyle } from '../styles/ReactSelectStyle'

import logo from '../images/logo.svg'

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
	const [showLoading, setShowLoading] = useState(false)

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
		setShowLoading(true)

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
				setShowLoading(false)
			})

		// change startGame condition to true. When user press start it means the game is starting
		setStartGame(true)
	}

	return (
		<div>
			{startGame === false && (
				<div>
					<QuizTitle>
						<div>
							<img src={logo} alt="Logo"/> 
						</div>
						Quizzr
					</QuizTitle>
					{/*
					{ console.log(category) }
					{ console.log(diff) }
					console.log(quizData) */
					}
		
					<form onSubmit={ handleStart }>
						<FormLabel>Choose Category</FormLabel>
						<Select
							defaultValue={ category }
							onChange={ setCategory }
							options={ categoryOptions }
							styles={ customStyle }
							error={ showError }
						/>
		
						<FormLabel>Choose Difficulty</FormLabel>
						<Select
							defaultValue={ diff }
							onChange= { setDiff }
							options={ diffOptions }
							styles={ customStyle }
							error={ showError }
						/>
		
						<StartButton>Start Quiz</StartButton>
					</form>
		
					{showError && (
						<AnswerCheckContainer style={{ marginTop: '2rem' }}>Category and Difficulty <br /> must be filled</AnswerCheckContainer>
					)}
		
				</div>
			)}

			{showLoading && (
				<Loading>Generating Questions ...</Loading>
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

			{startGame === false && (
				<div style={{ width: '100%', textAlign: 'center', marginTop: '1.25rem' }}>
					<a
						href="https://github.com/yoga-au/quizzr-js"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: 'black', fontSize: '.9em' }}
					>
						Source Code on GitHub
					</a>
				</div>
				)
			}
		</div>
	)
}

export default Quiz
