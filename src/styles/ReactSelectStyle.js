export const customStyle = {
	control: (baseStyle) => ({
		...baseStyle,
		borderRadius: '1.75em',
		// borderColor: '#77AAFE',
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
