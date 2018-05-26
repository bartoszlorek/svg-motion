module.exports = function(svg, className) {
    if (svg.attributes.class === className) {
        svg.elements = svg.elements[1].elements
    }
    return svg
}
