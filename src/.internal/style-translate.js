const hash = require('./hash')
const { ruleset, atRule } = require('./css-syntax')
const prefix = require('./css-prefixes')
const styleFramesIe = require('./style-frames-ie')

module.exports = function(className, frameNames, duration) {
    let result = ''
    const length = frameNames.length
    const keysName = hash('keyframes-animation', 'keys')

    // animation keyframes
    result += atRule(prefix('keyframes'), keysName, {
        '0%': [{
            prop: prefix('transform'),
            value: 'translate(0,0)'
        }],
        '100%': [{
            prop: prefix('transform'),
            value: `translate(-${length * 100}%,0)`
        }]
    })

    // common animation style
    result += ruleset('.' + className, [{
        prop: prefix('animation'),
        value: `${keysName} ${duration}ms steps(${length}) infinite`
    }])

    let framesIe = styleFramesIe(frameNames, duration)
    result += framesIe.animation
    result += `@media screen and (min-width:0\\0){${framesIe.ruleset}}`
    return result
}
