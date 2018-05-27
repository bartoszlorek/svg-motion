const convert = require('xml-js')
const unwrapRoot = require('./.internal/unwrap-root')
const isFrameNode = require('./.internal/is-frame-node')
const cleanAttrs = require('./.internal/clean-attrs')
const applyStyle = require('./.internal/apply-style')

const SVG_CLASS = 'svg-motion'

module.exports = function(config) {
    const { duration, iteration } = config

    return data => {
        const svgjs = convert.xml2js(data, {
            compact: false
        })

        const svg = unwrapRoot(svgjs.elements[0], SVG_CLASS)

        // recreate svg attributes
        svg.attributes = {
            width: '100%',
            class: SVG_CLASS,
            viewBox: svg.attributes.viewBox,
            preserveAspectRatio: 'xMidYMid meet',
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            'xml:space': 'preserve'
        }

        // wrap root around frames
        svg.elements = [{
            type: 'element',
            name: 'g',
            elements: svg.elements
                .filter(isFrameNode)
                .map(cleanAttrs)
        }]

        applyStyle(svg, duration, iteration)
        return convert.js2xml(svgjs, {
            compact: false
        })
    }
}
