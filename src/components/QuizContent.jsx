import React from 'react'
import PropTypes from 'prop-types'

const QuizContent = props => {
	const questionNumber = 0

	return (
		<>
			{
				props.data.length !== 0 && (
					<div>
						{ console.log(props.data) }
						<p>Questions No.{ questionNumber + 1 }</p>
						<p>{ props.data[questionNumber].question }</p>
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
