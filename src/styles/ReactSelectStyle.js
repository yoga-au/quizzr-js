export const customStyle = {
	control: (baseStyle, state) => ({
		...baseStyle,
		borderRadius: '1.75em',
		borderColor: state.selectProps.error ? '#FF0000' : 'hsl(0, 0%, 80%)',
		padding: '0.5em',

		// ':hover': {
		// 	borderColor: '#77AAFE',
		// }
	}),
	placeholder: (baseStyle) => ({
		...baseStyle,
		// color: '#004DDB',
	}),
	menu: (baseStyle) => ({
		...baseStyle,
		borderRadius: '1.75em',
	}),
	menuList: (baseStyle) => ({
		...baseStyle,
		borderRadius: '1.75em',
		padding: '.5em'
	}),
	option: (baseStyle) => ({
		...baseStyle,
		borderRadius: '1.25em',
		padding: '.75em',
		margin: '.5em 0'
	}), 
}
