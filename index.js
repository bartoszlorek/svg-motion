const { createSvgMotion } = require('./src/svg-motion')

createSvgMotion({
    input: './dist/loader.svg',
    output: './dist/loader-motion.svg',
    duration: 1500
})
