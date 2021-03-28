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

		if (questionNumber === props.data.length - 1) {
			setGameOver(true)
			return
		}

		setAnswerSubmitted(true)

		if (answer === props.data[questionNumber].correct_answer) {
			setScore(score + 1)
			// console.log(score)
			// break the function if condition are met
			return
		}

		console.log('Incorrect Answer')
	}

	const nextQuestion = () => {
		setQuestionNumber(questionNumber + 1)
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
						<p>{ he.decode(props.data[questionNumber].question) }</p>

						{/* Answer Choice */}
						{ props.data[questionNumber].answers.map((el, index) => {
							return (
								<div>
									<button
										key={ index }
										onClick={ () => handleAnswer(el) }
										disabled={ answerSubmitted }
									>
										{ he.decode(el) }
									</button>
								</div>
							)})
						}

						{answerSubmitted && (
							<button onClick={ nextQuestion }>Next Question</button>
						)}

					</div>
				)
			}
			{gameOver === true && (
				<>
					<p>Result</p>
					<p>{ score }</p>
				</>
			)}
		</>
	)
}

QuizContent.propTypes = {
	data: PropTypes.array
}

export default QuizContent
