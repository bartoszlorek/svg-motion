const patternChars = /[\*\!\?\(\|\)\[\]\+\@]/

module.exports = function(value) {
    return typeof value === 'string' && patternChars.test(value)
}
