import React, { useState } from 'react'
import PropTypes from 'prop-types'
import shuffle from 'lodash.shuffle'
import he from 'he'

const QuizContent = props => {
	// define state for question number, use for access specific index
	// in quiz data coming from props
	const [questionNumber, setQuestionNumber] = useState(0)
	// define state for answers choosen by user
	const [userAnswer, setUserAnswer] = useState('')
	// defin state for storing score
	const [score, setScore] = useState(0)

	const nextQuestion = () => {
		setQuestionNumber(questionNumber + 1)
	}

	const handleAnswer = (el) => {
		// for debugging
		// console.log(el)
		setUserAnswer(el)
	}

	return (
		<>
			{
				// check if props data exist, prevent error when react try to render
				// the component while props data doesn't exist
				props.data.length !== 0 && (
					<div>
						{/* for debugging 
						{ console.log(props.data) } */}
						<p>Questions No.{ questionNumber + 1 }</p>
						<p>{ he.decode(props.data[questionNumber].question) }</p>

						{/* Answer Choice */}
						{ shuffle(props.data[questionNumber].answers).map((el, index) => {
							return (
								<div>
									<button
										key={ index }
										onClick={ () => handleAnswer(el) }
									>
										{ he.decode(el) }
									</button>
								</div>
							)})
						}

						<button onClick={ nextQuestion }>Next Question</button>
					</div>
				)
			}
		</>
	)
}

QuizContent.propTypes = {
	data: PropTypes.array
}

export default QuizContent
