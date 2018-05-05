const svgMotion = require('./src/svg-motion')

svgMotion({
    source: './dist/!(*-motion).svg',
    output: './dist/[name]-motion.svg',
    className: 'icon-loader',
    duration: 1500
})
