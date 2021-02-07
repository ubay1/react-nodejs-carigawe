module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'lg-2rows-content': '20% 80%',
        'lg-2rows-content-menu': '40% 60%',
        'lg-3rows-content': '20% 60% 20%',
        'lg-4rows-content': '25% 25% 25% 25%',
        'lg-5rows-content': '20% 20% 20% 20% 20%',
        'md-3rows-content': '33.333333% 33.333333% 33.333333%',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '110': '110',
        '120': '120',
        '130': '130',
        '140': '140',
        '150': '150',
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
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
