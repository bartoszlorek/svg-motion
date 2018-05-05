const fs = require('fs')
const parser = require('xml-js')
const chalk = require('chalk')
const { deepFilter } = require('./.utils/deep.min')

const hash = require('./hash')
const styleFrames = require('./style-frames')

const CLASSNAME_PREFIX = 'frame-'
const CLASSNAME_LENGTH = 8

function createSvgMotion(options) {
    const { input, output, duration = 1000 } = options
    console.log('Input: ' + chalk.blue(input))

    fs.readFile(input, 'utf8', (error, data) => {
        if (error) {
            throw error
        }
        const frameNames = []
        let { svg } = parser.xml2js(data, {
            ignoreDeclaration: true,
            ignoreComment: true,
            compact: true
        })

        // pick attributes and groups (frames)
        svg = {
            _attributes: {
                width: '100%',
                viewBox: svg._attributes.viewBox,
                preserveAspectRatio: 'xMidYMid meet',
                xmlns: 'http://www.w3.org/2000/svg',
                'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                'xml:space': 'preserve'
            },
            g: svg.g
        }

        // clear additional style of frames
        svg.g = deepFilter(svg.g, (a, key) => key !== 'class')

        // hash frame names
        svg.g.forEach((frame, index) => {
            let name = hash(
                frame._attributes.id + index,
                CLASSNAME_PREFIX + index + '-',
                CLASSNAME_LENGTH
            )
            frameNames.push(name)
            frame._attributes = {
                class: name
            }
        })

        // add style element
        svg.style = {
            _attributes: { type: 'text/css' },
            _text: styleFrames(frameNames, duration)
        }

        const result = parser.js2xml({ svg }, { compact: true })
        fs.writeFileSync(output, result, 'utf8')
        console.log('Output: ' + chalk.blue(output))
        console.log(chalk.gray('The SVG file has been created.'))
    })
}

module.exports = {
    createSvgMotion
}
