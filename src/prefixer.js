const vendors = {
    keyframes: ['@-webkit-keyframes', '@keyframes'],
    animation: ['-webkit-animation', 'animation'],
    animationDelay: ['-webkit-animation-delay', 'animation-delay']
}

function prefixer(key, value) {
    return vendors[key].reduce((str, prop) => {
        let separator = prop[0] === '@' ? ' ' : ':'
        return str + `${prop}${separator}${value}`
    }, '')
}

module.exports = prefixer
