const hash = require('./hash')
const prefix = require('../.utils/css-prefixes')
const { ruleset, atRule } = require('../.utils/css-syntax')
const parseViewBox = require('../.utils/parse-view-box')

// -webkit-animation: Chr, Saf
// animation: IE >9, Fx >15, Op >12.0

// -webkit-transform: Ch <36, Saf 5.1+, iOS < 9.2, An =<4.4.4
// -ms-transform: IE 9
// transform: IE 10, Fx 16+, Op 12.1+

module.exports = function(svg, duration, iteration) {
    iteration = iteration ? iteration : 'infinite'
    let result = ''

    const root = svg.elements[0]
    const frames = root.elements
    const length = frames.length
    const offset = parseViewBox(svg.attributes.viewBox).width
    const delayUnit = Math.round(duration / length)

    const signature = JSON.stringify(frames)
    const rootClassName = hash(signature, 'r')
    const framesClassName = hash(signature, 'f')
    const transformName = hash('transform-animation', 'k')
    const visibilityName = hash('visibility-animation', 'k')

    // add class to root element
    if (root.attributes == null) {
        root.attributes = {}
    }
    root.attributes.class = rootClassName

    // add class and local style to each frame
    // IE ignores svg style transformation
    // IE accepts svg style animation delay
    frames.forEach((frame, index) => {
        frame.attributes.class = framesClassName
        frame.attributes.style = `transform:translate(${offset * index}px,0);animation-delay:${delayUnit * index}ms;`

        // IE9 fallback: not animating but visible
        if (index === 0) {
            frame.attributes.style += 'visibility:visible;'
        }
    })

    // transform animation keyframes (for non-IE browsers)
    result += atRule(prefix('keyframes'), transformName, {
        '0%': [{
            prop: ['-webkit-transform', 'transform'],
            value: 'translate(0,0)'
        }],
        '100%': [{
            prop: ['-webkit-transform', 'transform'],
            value: `translate(-${length * 100}%,0)`
        }]
    })

    result += ruleset('.' + rootClassName, [{
        prop: prefix('animation'),
        value: `${transformName} ${duration}ms steps(${length}) ${iteration}`
    }])

    // visibility animation keyframes (for IE10+ browsers)
    const point = Math.round(100 / length) + '%'
    result += atRule('keyframes', visibilityName, {
        '0%': 'visibility:visible',
        [point]: 'visibility:hidden',
        '100%': 'visibility:hidden'
    })

    const onlyIE = 'screen and (min-width:0\\0)'
    result += atRule('media', onlyIE, {
        ['.' + framesClassName]: `animation:${visibilityName} ${duration}ms steps(${length}) ${iteration};visibility:hidden`
    })

    // add style element before root
    svg.elements.unshift({
        type: 'element',
        name: 'style',
        attributes: {
            type: 'text/css'
        },
        elements: [{
            type: 'text',
            text: result
        }]
    })

    return svg
}
