const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', ()=> {
    it('should generate correct location object', (done)=> {
        const from = 'User';
        const coords = {
            latitude: 1,
            longitude: 1
        }
        const message = generateLocationMessage(from, coords);
        expect(message.from).toBe(from);
        expect(message.url).toBe(`https://www.google.com/maps/@?api=1&map_action=map?center=${coords.latitude},${coords.longitude}`);
        expect(typeof message.createdAt).toBe('number');
        done();
    });
})