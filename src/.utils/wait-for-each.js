function waitForEach(processFunc, [head, ...tail]) {
    return head
        ? processFunc(head).then(waitForEach(processFunc, tail))
        : Promise.resolve()
}

module.exports = waitForEach
