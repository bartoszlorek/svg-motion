const {
    block,
    declaration,
    ruleset,
    atRule
} = require('../src/.internal/css-syntax')

describe('block', () => {
    it('should always return string', () => {
        expect(block('name')).toBe('name{}')
        expect(block('name', null)).toBe('name{}')
        expect(block('name', 'body')).toBe('name{body}')
    })
})

describe('declaration', () => {
    it('should handle falsy value', () => {
        expect(declaration(null)).toBe('')
        expect(
            declaration({
                prop: 'top',
                value: null
            })
        ).toBe('')
    })

    it('should handle string declaration', () => {
        expect(declaration('width:100%;')).toBe('width:100%;')
    })

    it('should handle object declaration', () => {
        expect(
            declaration({
                prop: 'width',
                value: '100%'
            })
        ).toBe('width:100%;')
    })

    it('should handle property with variants (prefixes)', () => {
        let result = declaration({
            prop: ['-webkit-animation', 'animation'],
            value: 'name 1s'
        })
        expect(result).toBe('-webkit-animation:name 1s;animation:name 1s;')
    })

    it('should add missing semicolon', () => {
        expect(declaration('width:100%')).toBe('width:100%;')
    })
})

describe('ruleset', () => {
    it('should put declarations [Object] in the block', () => {
        let result = ruleset('.selector', [
            { prop: 'width', value: '100%' },
            { prop: 'height', value: '100%' }
        ])
        expect(result).toBe('.selector{width:100%;height:100%;}')
    })

    it('should put declarations [String] in the block', () => {
        let result = ruleset('.selector', ['width:100%', 'height:100%'])
        expect(result).toBe('.selector{width:100%;height:100%;}')
    })

    it('should put declarations [Object|String] in the block', () => {
        let result = ruleset('.selector', [
            { prop: 'width', value: '100%' },
            'height:100%'
        ])
        expect(result).toBe('.selector{width:100%;height:100%;}')
    })
})

describe('atRule', () => {
    it('should put rulesets [Object] in the body', () => {
        let result = atRule('keyframe', 'name', {
            from: [
                { prop: 'top', value: '0px' },
                { prop: 'left', value: '0px' }
            ],
            to: [
                { prop: 'top', value: '100px' },
                { prop: 'left', value: '100px' }
            ]
        })
        expect(result).toBe(
            '@keyframe name{from{top:0px;left:0px;}to{top:100px;left:100px;}}'
        )
    })

    it('should put rulesets [String] in the body', () => {
        let result = atRule('keyframe', 'name', {
            from: 'top:0px;left:0px',
            to: 'top:100px;left:100px'
        })
        expect(result).toBe(
            '@keyframe name{from{top:0px;left:0px;}to{top:100px;left:100px;}}'
        )
    })

    it('should handle rule without body', () => {
        let result = atRule('charset', 'utf-8')
        expect(result).toBe('@charset utf-8;')
    })

    it('should handle unconditional body', () => {
        let result = atRule('font-face', '', [
            { prop: 'font-family', value: '"Open Sans"' },
            { prop: 'src', value: 'url(...)' }
        ])
        expect(result).toBe(
            '@font-face {font-family:"Open Sans";src:url(...);}'
        )
    })
})
