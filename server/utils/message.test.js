const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage function:', ()=> {
    it('should create a new message when called with two values', (done)=> {
        const user = 'user';
        const text='test message';
        const message = generateMessage(user, text);
        expect(message.from).toBe(user);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeTruthy();
        expect(typeof message.createdAt).toBe('number');
        done();
    });

});