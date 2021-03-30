import styled from 'styled-components'

export const QuizTitle = styled.h1`
	text-align: center;
	margin-bottom: 2rem;
`

export const FormLabel = styled.p`
	margin: 1.5rem 0 1rem;
`

// reset button default style
export const BtnReset = styled.button`
	all: unset;
`

// extend button reset
export const StartButton = styled(BtnReset)`
	display: block;
	width: 100%;
	text-align: center;
	margin-top: 1.5rem;
	padding: 1rem 0;
	/* border: 1px solid black; */
	border-radius: 1.75rem;
	font-size: 1rem;
	font-weight: 700;
	letter-spacing: 1px;
	background: linear-gradient(180deg, #87B4FE 0%, #5490FA 100%);
	box-shadow: 2px 6px 12px rgba(138, 183, 255, 0.54);
	color: white;
`

// styled component for QuizContent
export const QuestionContainer = styled.div`
	/* border: 1px solid rgba(0, 0, 0, .24); */
	border-radius: 1rem;
	padding: 1rem;
	margin-bottom: 1rem;
	background: #4E90FE;
	color: white;
`

export const NumContainer = styled.div`
	width: 100%;
	/* border: 1px solid black; */
	margin-bottom: 1rem;
`

export const QuestionNum = styled.p`
	font-weight: 700;
`

export const Question = styled.p`
	line-height: 161.8%;
	font-weight: 700;
	letter-spacing: .5px;
`

export const ChoiceButton = styled(BtnReset)`
	width: 100%;
	border: 1px solid rgba(0, 0, 0, .16);
	border-radius: .5rem;
	padding: 1rem 0;
	margin-bottom: .5rem;
	color: rgba(0, 0, 0, .54);

	&:hover:enabled {
		border: 1px solid rgba(0, 0, 0, .54);
		color: black;
	}

	&:disabled {
		background-color: rgba(0, 0, 0, .06)
	}
`

export const Choice = styled.span`
	margin-left: 1rem;
`

export const NextQuestion = styled(BtnReset)`
	/* width: 50%; */
	/* border: 1px solid black; */
	border-radius: .5rem;
	margin-top: 1rem;
	padding: 1rem;
	background: #4E90FE;
	color: white;
	font-weight: 700;
`

export const AnswerCheckContainer = styled(QuestionContainer)`
	background: ${props => props.correct ? '#99FFA3' : '#FFCBCB'};
	color: black;
	text-align: center;
	/* border: .5px solid #03B014; */
	border: ${props => props.correct ? '.5px solid #03B014' : '.5px solid #B00303' };
	font-weight: 700;
`
