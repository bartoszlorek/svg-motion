const prefix = require('../src/.utils/css-prefixes')

describe('css-prefixes', () => {
    it('should return null for falsy values', () => {
        expect(prefix()).toBe(null)
        expect(prefix(null)).toBe(null)
    })

    it('should return string for non-prefixed prop', () => {
        expect(prefix('not')).toBe('not')
    })

    it('should return array with prefixes', () => {
        expect(prefix('animation')).toEqual([
            '-webkit-animation',
            'animation'
        ])
    })
})
