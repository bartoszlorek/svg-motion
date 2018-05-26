const frameNodes = ['path', 'g']

module.exports = function(node) {
    return frameNodes.indexOf(node.name) !== -1
}
