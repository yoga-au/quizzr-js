import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import shuffle from 'lodash.shuffle'

const QuizContent = props => {
	
	const [questionNumber, setQuestionNumber] = useState(0)
	// const [choice, setChoice] = useState([])

	// useEffect(() => {
	// 	setChoice(props.data[questionNumber].answers)
	// }, [props.data, questionNumber])
	// const choice = shuffle(props.data[questionNumber].answers)

	return (
		<>
			{
				props.data.length !== 0 && (
					<div>
						{ console.log(props.data) }
						<p>Questions No.{ questionNumber + 1 }</p>
						<p>{ props.data[questionNumber].question }</p>
						{ shuffle(props.data[questionNumber].answers).map(el => {
							return (
							<p>{el}</p>
							)})
						}
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
