module.exports = (num, size = 2) => {
    var s = '000000000' + num
    return s.substr(s.length - size)
}
