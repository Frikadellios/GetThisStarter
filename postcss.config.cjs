const path = require('path')

module.exports = {
  plugins: {
    autoprefixer: {},
    tailwindcss: {
      config: path.join('tailwind.config.cjs'),
    },
  },
}
