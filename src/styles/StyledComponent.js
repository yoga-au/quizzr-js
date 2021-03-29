import styled from 'styled-components'

export const QuizTitle = styled.h1`
	text-align: center;
	margin-bottom: 2rem;
`

export const FormLabel = styled.p`
	margin: 1.5rem 0 .5rem;
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
	margin-top: 1.5em;
	padding: 1rem 0;
	/* border: 1px solid black; */
	border-radius: 1.75em;
	font-weight: 700;
	background-color: #F866BD;
	color: white;
`
