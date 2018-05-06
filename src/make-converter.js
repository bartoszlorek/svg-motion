const convert = require('xml-js')
const styleFrames = require('./.internal/style-frames')
const hash = require('./.internal/hash')

const omit = require('./.utils/omit')
const pad = require('./.utils/pad')

const INCLUDE_ELEMENTS = ['path', 'g']
const EXCLUDE_ATTRS = ['id', 'display', 'visibility']
const CLASSNAME_PREFIX = 'f'
const CLASSNAME_LENGTH = 8

module.exports = function(config) {
    const extraClassName = config.className ? ' ' + config.className : ''

    return data => {
        const frameClasses = []
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

        // remove unnecessary elements
        svg.elements = svg.elements.filter(node => {
            return INCLUDE_ELEMENTS.indexOf(node.name) !== -1
        })

        const frames = svg.elements
        const digitsLength = frames.length.toString().length + 1

        // hash classNames and clean attributes
        frames.forEach((frame, index) => {
            const name = hash(
                frame.attributes.id + index,
                CLASSNAME_PREFIX + pad(index, digitsLength) + '-',
                CLASSNAME_LENGTH
            )
            frameClasses.push(name)
            frame.attributes = omit(frame.attributes, EXCLUDE_ATTRS)
            frame.attributes.class = name + extraClassName
        })

        // add motion style element
        svg.elements.unshift({
            type: 'element',
            name: 'style',
            attributes: {
                type: 'text/css'
            },
            elements: [
                {
                    type: 'text',
                    text: styleFrames(frameClasses, config.duration)
                }
            ]
        })

        return convert.js2xml(svgjs, { compact: false })
    }
}
