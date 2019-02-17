const expect = require('expect');
const { isRealString } = require('./validation');

describe("isRealString function:", ()=> {
    it('should reject non-strings', ()=> {
        expect(isRealString(76)).toBeFalsy();
    })
    it('should allow a valid String', ()=> {
        expect(isRealString('test   ')).toBeTruthy;
    });
    it('should reject an empty string', ()=> {
        expect(isRealString('')).toBeFalsy;
    });
    it('should reject string with only spaces', ()=> {
        expect(isRealString('    ')).toBeFalsy;
    })
})