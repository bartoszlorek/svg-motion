const hash = require('./hash')
const { ruleset, atRule } = require('./css-syntax')
const prefix = require('./css-prefixes')

module.exports = function(classes, duration) {
    if (classes == null || !classes.length) {
        return {}
    }

    let result = {}

    const length = classes.length
    const delay = Math.round(duration / length)
    const point = Math.round(100 / length) + '%'
    const keysName = hash('keyframes-animation', 'keys-')

    // animation keyframes
    result.animation = atRule(prefix('keyframes'), keysName, {
        '0%': 'visibility:visible',
        [point]: 'visibility:hidden',
        '100%': 'visibility:hidden'
    })

    // common animation style
    result.ruleset = ruleset('.' + classes.join(',.'), [
        {
            prop: prefix('animation'),
            value: `${keysName} ${duration}ms steps(${length}) infinite`
        },
        'visibility:hidden'
    ])

    // delay for each frame
    result.ruleset += classes.reduce((string, name, index) => {
        return string + ruleset('.' + name, [{
            prop: prefix('animation-delay'),
            value: `${delay * index}ms`
        }])
    }, '')

    // fallback IE9
    result.ruleset += ruleset('.' + classes[0], ['visibility:visible'])

    return result
}
