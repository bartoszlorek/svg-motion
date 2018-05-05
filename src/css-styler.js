const hash = require('./.internal/hash')
const keyframes = require('./.internal/keyframes')
const prefixer = require('./.internal/prefixer')

module.exports = function(classes, config = {}) {
    if (classes == null || !classes.length) {
        return ''
    }

    let result = ''
    const { duration } = config
    const length = classes.length
    const delay = Math.round(duration / length)
    const point = Math.round(100 / length) + '%'
    const keysName = hash('keyframes-animation', 'keys-')

    // animation keyframes
    result += prefixer(
        'keyframes',
        keyframes(keysName, {
            '0%': 'visibility:visible;',
            [point]: 'visibility:hidden;',
            '100%': 'visibility:hidden;'
        })
    )

    // common animation style
    result += '.' + classes.join(',.') + '{'
    result += prefixer(
        'animation',
        `${keysName} ${duration}ms steps(${length}) infinite;`
    )
    result += 'visibility:hidden;}'

    // delay for each frame
    result += classes.reduce((str, name, index) => {
        let style = prefixer('animationDelay', `${delay * index}ms;`)
        return str + `.${name}{${style}}`
    }, '')

    // fallback IE9
    result += `.${classes[0]}{visibility:visible;}`

    return result
}
