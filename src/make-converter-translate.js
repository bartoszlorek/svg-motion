const convert = require('xml-js')
const styleTranslate = require('./.internal/style-translate')
const hash = require('./.internal/hash')
const parseViewBox = require('./.utils/parse-view-box')

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
        const rootName = hash(JSON.stringify(svg.elements), 'root')
        const rootWidth = parseViewBox(svg.attributes.viewBox).width

        // recreate svg attributes
        svg.attributes = {
            width: '100%',
            viewBox: svg.attributes.viewBox,
            preserveAspectRatio: 'xMidYMid meet',
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            'xml:space': 'preserve'
        }

        // parse frames
        const frames = svg.elements
            .filter(node => INCLUDE_ELEMENTS.indexOf(node.name) !== -1)
            .map((frame, i) => {
                const frameName = hash(
                    frame.attributes.id + i,
                    CLASSNAME_PREFIX + i,
                    CLASSNAME_LENGTH
                )
                frameClasses.push(frameName)
                frame.attributes = omit(frame.attributes, EXCLUDE_ATTRS)
                frame.attributes.class = frameName + extraClassName
                frame.attributes.style = `transform:translate(${rootWidth * i}px,0);`
                return frame
            })

        svg.elements = [
            {
                type: 'element',
                name: 'style',
                attributes: {
                    type: 'text/css'
                },
                elements: [
                    {
                        type: 'text',
                        text: styleTranslate(
                            rootName,
                            frameClasses,
                            config.duration
                        )
                    }
                ]
            },
            {
                type: 'element',
                name: 'g',
                attributes: {
                    class: rootName
                },
                elements: frames
            }
        ]

        return convert.js2xml(svgjs, { compact: false })
    }
}
