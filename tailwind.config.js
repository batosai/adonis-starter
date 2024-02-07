module.exports = {
  mode: 'jit',
  content: ['./resources/views/**/*.edge', './resources/js/**/*.js'],
  darkMode: 'class',
  theme: {
    themeVariants: ['dark'],
  },
  plugins: [require('@tailwindcss/forms')],
}
