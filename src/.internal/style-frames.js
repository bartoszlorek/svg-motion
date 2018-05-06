const hash = require('./hash')
const keyframes = require('./keyframes')
const prefixer = require('./prefixer')
const ruleset = require('./style-ruleset')

module.exports = function(classes, duration) {
    if (classes == null || !classes.length) {
        return ''
    }

    let result = ''
    const length = classes.length
    const delay = Math.round(duration / length)
    const point = Math.round(100 / length) + '%'
    const keysName = hash('keyframes-animation', 'keys-')

    // animation keyframes
    result += prefixer.keyframes(
        keyframes(keysName, {
            '0%': 'visibility:visible;',
            [point]: 'visibility:hidden;',
            '100%': 'visibility:hidden;'
        })
    )

    // common animation style
    result += ruleset(classes.join(',.'), [
        'visibility:hidden',
        prefixer.animation(
            `${keysName} ${duration}ms steps(${length}) infinite;`
        )
    ])

    // delay for each frame
    result += classes.reduce((str, name, index) => {
        let rules = prefixer.animationDelay(`${delay * index}ms;`)
        return str + `.${name}{${rules}}`
    }, '')

    // fallback IE9
    result += ruleset(classes[0], ['visibility:visible'])

    return result
}
