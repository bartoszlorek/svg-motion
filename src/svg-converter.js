const convert = require('xml-js')
const omit = require('./.utils/omit')
const applyStyle = require('./.internal/apply-style')

const INCLUDE_ELEMS = ['path', 'g']
const EXCLUDE_ATTRS = ['id', 'display', 'visibility']
const SVG_CLASS = 'svg-motion'

const unwrapRoot = svg => {
    if (svg.attributes.class === SVG_CLASS) {
        svg.elements = svg.elements[1].elements
    }
    return svg
}
const isIncludedFrame = node => {
    return INCLUDE_ELEMS.indexOf(node.name) !== -1
}
const cleanAttributes = frame => {
    frame.attributes = omit(frame.attributes, EXCLUDE_ATTRS)
    return frame
}

module.exports = function(config) {
    return data => {
        const svgjs = convert.xml2js(data, {
            compact: false
        })

        const svg = unwrapRoot(svgjs.elements[0])

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
                .filter(isIncludedFrame)
                .map(cleanAttributes)
        }]

        applyStyle(svg, config.duration)
        return convert.js2xml(svgjs, {
            compact: false
        })
    }
}