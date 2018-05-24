const svgMotion = require('./src/svg-motion')

// svgMotion({
//     source: './dist/!(*-motion).svg',
//     output: './dist/[name]-motion.svg',
//     duration: 1200
// })

svgMotion({
    source: './dist/*(loader|loader-white).svg',
    duration: 1200
})
