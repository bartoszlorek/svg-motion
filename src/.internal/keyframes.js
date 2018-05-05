module.exports = function(name, frames) {
    let result = Object.keys(frames).reduce((prev, prop) => {
        return prev + `${prop}{${frames[prop]}}`
    }, '')
    return `${name}{${result}}`
}
