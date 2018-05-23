module.exports = function(value) {
    let parts = String(value)
        .split(' ')
        .map(a => parseInt(a, 10))
    return {
        left: parts[0] || 0,
        top: parts[1] || 0,
        width: parts[2] || 0,
        height: parts[3] || 0
    }
}
