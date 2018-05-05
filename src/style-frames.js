const hash = require('./.internal/hash')
const prefixer = require('./.internal/prefixer')
const keyframes = require('./.internal/keyframes')

function styleFrames(frames, duration = 1000) {
    if (frames == null || !frames.length) {
        return ''
    }
    let result = ''
    const length = frames.length
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
    result += '.' + frames.join(',.') + '{'
    result += prefixer(
        'animation',
        `${keysName} ${duration}ms steps(${length}) infinite;`
    )
    result += 'visibility:hidden;}'

    // delay for each frame
    result += frames.reduce((str, name, index) => {
        let style = prefixer('animationDelay', `${delay * index}ms;`)
        return str + `.${name}{${style}}`
    }, '')

    return result
}

module.exports = styleFrames
