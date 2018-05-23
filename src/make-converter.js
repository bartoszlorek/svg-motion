const convert = require('xml-js')
const applyStyle = require('./.internal/apply-style')
const omit = require('./.utils/omit')

const INCLUDE_ELEMENTS = ['path', 'g']
const EXCLUDE_ATTRS = ['id', 'display', 'visibility']

module.exports = function(config) {
    return data => {
        const svgjs = convert.xml2js(data, {
            compact: false
        })

        const svg = svgjs.elements[0]

        // recreate svg attributes
        svg.attributes = {
            width: '100%',
            viewBox: svg.attributes.viewBox,
            preserveAspectRatio: 'xMidYMid meet',
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            'xml:space': 'preserve'
        }

        // wrap root element around frames
        svg.elements = [{
            type: 'element',
            name: 'g',
            attributes: {},
            elements: svg.elements
                .filter(node => {
                    return INCLUDE_ELEMENTS.indexOf(node.name) !== -1
                })
                .map((frame, index) => {
                    frame.attributes = omit(frame.attributes, EXCLUDE_ATTRS)
                    return frame
                })
        }]

        applyStyle(svg, config.duration)
        return convert.js2xml(svgjs, { compact: false })
    }
}
