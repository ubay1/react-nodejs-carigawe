module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        'lg-3rows-content': '20% 60% 20%',
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
        '-30': '-30',
        '-40': '-40',
        '-50': '-50',
        '-60': '-60',
        '-70': '-70',
        '-80': '-80',
        '-90': '-90',
        '-100': '-100',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
