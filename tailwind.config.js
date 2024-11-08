/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "0": "#000000",
          "10": "#131c25",
          "20": "#28313b",
          "25": "#333c46",
          "30": "#3f4851",
          "35": "#4a535d",
          "40": "#565f6a",
          "50": "#6f7883",
          "60": "#88929d",
          "70": "#a3acb8",
          "80": "#bec7d3",
          "90": "#dae3f0",
          "95": "#e8f2fe",
          "98": "#f7f9ff",
          "99": "#fcfcff",
          "100": "#ffffff",
        },
        secondary: {
          "0":  "#000000",
          "10": "#002106",
          "20": "#00390f",
          "25": "#004615",
          "30": "#00531a",
          "35": "#00601f",
          "40": "#006e25",
          "50": "#008a31",
          "60": "#00a73d",
          "70": "#00c64a",
          "80": "#12e558",
          "90": "#6cff81",
          "95": "#c7ffc4",
          "98": "#ebffe6",
          "99": "#f6fff0",
          "100":"#ffffff",
        },
        error: {
          "0":  "#000000",
          "10": "#410002",
          "20": "#690005",
          "25": "#7e0007",
          "30": "#93000a",
          "35": "#a80710",
          "40": "#ba1a1a",
          "50": "#de3730",
          "60": "#ff5449",
          "70": "#ff897d",
          "80": "#ffb4ab",
          "90": "#ffdad6",
          "95": "#ffedea",
          "98": "#fff8f7",
          "99": "#fffbff",
          "100":"#ffffff",
      }
      }
    },
    fontFamily: {
      'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
}
