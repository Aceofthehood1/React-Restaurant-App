/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'cream': '#EDEEC0',
      'project-green': '#0C7C59',
      'project-blue': '#004E89',
      'project-l-blue': '#63B0CD',
      'project-indigo': '#9381FF',
      'black': '#000000',
      'white': '#FFFFFF',
    },
  },
  plugins: [require('daisyui'),],
}
