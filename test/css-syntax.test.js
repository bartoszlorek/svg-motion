const { declaration, ruleset, atRule } = require('../src/.internal/css-syntax')

describe('declaration', () => {
    it('should handle falsy value', () => {
        expect(declaration(null)).toBe(false)
        expect(
            declaration({
                prop: 'height',
                value: null
            })
        ).toBe(false)
    })

    it('should handle string declaration', () => {
        expect(declaration('width:100%;')).toBe('width:100%;')
    })

    it('should add missing semicolon', () => {
        expect(declaration('width:100%')).toBe('width:100%;')
    })

    it('should handle object declaration', () => {
        expect(
            declaration({
                prop: 'width',
                value: '100%'
            })
        ).toBe('width:100%;')
    })

    it('should handle prefixed declaration (multiple props)', () => {
        let result = declaration({
            prop: ['-webkit-animation', 'animation'],
            value: 'name 1s'
        })
        expect(result).toBe('-webkit-animation:name 1s;animation:name 1s;')
    })
})

describe('ruleset', () => {
    it('should use declaration', () => {
        let result = ruleset('.selector', [
            {
                prop: 'width',
                value: '100%'
            },
            {
                prop: 'height',
                value: '100%'
            }
        ])
        expect(result).toBe('.selector{width:100%;height:100%;}')
    })
})

describe('atRule', () => {
    it('should handle string declaration', () => {
        let result = atRule('keyframe', 'name', {
            '0%': 'width:0%',
            '100%': 'width:100%'
        })
        expect(result).toBe('@keyframe name{0%{width:0%;}100%{width:100%;}}')
    })

    it('should handle object declaration', () => {
        let result = atRule('keyframe', 'name', {
            '0%': {
                prop: 'width',
                value: '0%'
            },
            '100%': {
                prop: 'width',
                value: '100%'
            }
        })
        expect(result).toBe('@keyframe name{0%{width:0%;}100%{width:100%;}}')
    })

    it('should handle multiple declarations', () => {
        let result = atRule('keyframe', 'name', {
            '0%': [
                {
                    prop: 'width',
                    value: '0%'
                },
                {
                    prop: 'height',
                    value: '0%'
                }
            ],
            '100%': [
                {
                    prop: 'width',
                    value: '100%'
                },
                {
                    prop: 'height',
                    value: '100%'
                }
            ]
        })
        expect(result).toBe(
            '@keyframe name{0%{width:0%;height:0%;}100%{width:100%;height:100%;}}'
        )
    })
})
