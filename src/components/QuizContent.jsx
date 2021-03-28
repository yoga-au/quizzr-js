import React, { useState } from 'react'
import PropTypes from 'prop-types'
import he from 'he'

const QuizContent = props => {
	// define state for question number, use for access specific index
	// in quiz data coming from props
	const [questionNumber, setQuestionNumber] = useState(0)
	// define state for storing score
	const [score, setScore] = useState(0)
	// define state for conditionally change disabled attribute
	// in answer button and next question button
	const [answerSubmitted, setAnswerSubmitted] = useState(false)
	// define state for game over condition
	const [gameOver, setGameOver] = useState(false)

	const handleAnswer = (answer) => {
		// for debugging
		// console.log(el)

		// check if current question is the last one or not
		// if it's last question, set game over to true
		if (questionNumber === props.data.length - 1) {

			// check if the answer are correct, then add 1 to score state
			if (answer === props.data[questionNumber].correct_answer) {
				setScore(score + 1)
				console.log('Correct')
				// console.log(score)
			}

			setGameOver(true)
			// break the function if condition are met
			return
		}

		// when user submit an answer, set disabled attribute in answer button
		// controlled by answerSubmitted state
		setAnswerSubmitted(true)

		// check if the answer are correct, then add 1 to score state
		if (answer === props.data[questionNumber].correct_answer) {
			setScore(score + 1)
			console.log('Correct')
			// console.log(score)
			// break the function if condition are met
			return
		}

		// wrong answer code goes here
		console.log('Incorrect Answer')
	}

	const nextQuestion = () => {
		// add 1 to move index of the question number forward
		setQuestionNumber(questionNumber + 1)
		// reset answerSubmitted state to initial state
		setAnswerSubmitted(false)
	}

	return (
		<>
			{
				// check if props data exist, prevent error when react try to render
				// the component while props data doesn't exist
				props.data.length !== 0 && gameOver === false && (
					<div>
						{/* for debugging  */}
						{/* { console.log(props.data) } */}
						<p>Questions No.{ questionNumber + 1 }</p>

						{/* Render Question */}
						<p>{ he.decode(props.data[questionNumber].question) }</p>

						{/* Render Answer Choice */}
						{ props.data[questionNumber].answers.map((el, index) => {
							return (
								<div>
									<button
										key={ index }
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
							<button onClick={ nextQuestion }>Next Question</button>
						)}

					</div>
				)
			}

			{/* Render result when the game is over */}
			{gameOver === true && (
				<>
					<p>Result</p>
					<p>{ score }</p>

					<button onClick={ () => props.setStartGame(false) }>Restart</button>
				</>
			)}
		</>
	)
}

QuizContent.propTypes = {
	data: PropTypes.array,
	setStartGame: PropTypes.func
}

export default QuizContent
