module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		colors: {
			green: {
				light: "#ACFFE6",
				lighter: "#F0FFFA",
				default: " #00B87C",
			},
			pink: {
				light: "#FFD3D3",
			},
			white: {
				default: "#FFFFFF",
			},
			yellow: {
				default: "#FFFDCD",
			},
			blue: {
				default: "#CDF3FF",
				darker: "#00057F",
			},
			red: {
				default: "#F40101",
			},
			black: {
				default: "#393939",
			},
			gray: {
				default: "#8B8B8B",
				100: "#A1A1A1"
			},
		},
		variants: {
			extend: {},
		},
		plugins: [],
	},
};
