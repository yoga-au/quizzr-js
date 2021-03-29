import React, { useState } from 'react'
import PropTypes from 'prop-types'
import he from 'he'

const QuizContent = props => {
	// define state for question number, use for access specific index in quiz data coming from props
	// define state for storing score
	// define state for conditionally change disabled attribute
	// define state for game over condition
	// define state for check if the answer correct or not

	const [questionNumber, setQuestionNumber] = useState(0)
	const [score, setScore] = useState(0)
	const [answerSubmitted, setAnswerSubmitted] = useState(false)
	const [gameOver, setGameOver] = useState(false)
	const [isCorrect, setIsCorrect] = useState(false)

	// handle answer user submitted
	const handleAnswer = (answer) => {
		// console.log(el)

		// when user submit an answer, set disabled attribute in answer button
		// controlled by answerSubmitted state
		setAnswerSubmitted(true)

		// check if the answer are correct, then add 1 to score state
		if (answer === props.data[questionNumber].correct_answer) {
			setScore(score + 1)
			setIsCorrect(true)
			console.log('Correct')
			// console.log(score)
			// break the function if condition are met
			return
		}

		// wrong answer code goes here
		setIsCorrect(false)
		console.log('Incorrect Answer')
	}

	// handle when user click next question or see result
	const nextQuestion = () => {
		// check if current question is the last one or not
		// if it's last question, set game over to true
		if (questionNumber === props.data.length - 1) {
			setGameOver(true)
			// break the function if condition are met
			return
		}

		// add 1 to move index of the question number forward
		setQuestionNumber(questionNumber + 1)

		// reset answerSubmitted state and isCorrect state
		setAnswerSubmitted(false)
		setIsCorrect(false)
	}

	const handleRestart = () => {
		// reset state in quiz component
		// by lifting up state
		props.setDiff(null)
		props.setCategory(null)
		props.setQuizData([])
		props.setStartGame(false)
	}

	return (
		<>
			{
				// check if props data exist, prevent error when react try to render
				// the component while props data doesn't exist
				props.data.length !== 0 && gameOver === false && (
					<div>
						{/* { console.log(props.data) } */}
						<p>Questions No.{ questionNumber + 1 }</p>

						{/* Render Question */}
						<p>{ he.decode(props.data[questionNumber].question) }</p>

						{/* Render Answer Choice */}
						{ props.data[questionNumber].answers.map((el, index) => {
							return (
								<div key={ index }>
									<button
										onClick={ () => handleAnswer(el) }
										disabled={ answerSubmitted }
									>
										{/* Answer Content */}
										{ he.decode(el) }
									</button>
								</div>
							)})
						}

						{/* Render next button when user submit answer */}
						{answerSubmitted && (
							<>
								<button onClick={ nextQuestion }>{
									questionNumber === props.data.length - 1 ?
									'See Result' :
									'Next Question'
								}</button>
								<p>{
										isCorrect ? 
										'Correct' : 
										`Incorrect, the correct answer is: ${props.data[questionNumber].correct_answer}`
								}</p>
							</>
						)}

					</div>
				)
			}

			{/* Render result when the game is over */}
			{gameOver === true && (
				<>
					<p>Result</p>
					<p>{ score }</p>

					<button onClick={ handleRestart }>Restart</button>
				</>
			)}
		</>
	)
}

QuizContent.propTypes = {
	data: PropTypes.array,
	setStartGame: PropTypes.func,
	setQuizData: PropTypes.func,
	setCategory: PropTypes.func,
	setDiff: PropTypes.func
}

export default QuizContent
