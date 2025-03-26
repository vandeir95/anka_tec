module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}', // Adicione esta linha para suportar os componentes ShadCN
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
