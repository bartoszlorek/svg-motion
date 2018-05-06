const svgMotion = require('./src/svg-motion')

svgMotion({
    source: './dist/!(*-motion).svg',
    output: './dist/[name]-motion.svg',
    duration: 1200
})
