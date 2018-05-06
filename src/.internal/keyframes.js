/*
    keyframes('animationName', {
        '0%': 'declaration',
        '50%': 'declaration',
        '100%': 'declaration'
    })
*/

module.exports = function(name, frames) {
    let result = Object.keys(frames).reduce((prev, prop) => {
        return prev + `${prop}{${frames[prop]}}`
    }, '')
    return `${name}{${result}}`
}
