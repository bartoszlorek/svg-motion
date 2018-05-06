module.exports = function(selector, rules) {
    return rules.reduce((result, value) => {
        let semi = value[value.length - 1] !== ';'
        return result + value + (semi ? ';' : '')
    }, '.' + selector + '{') + '}'
}
