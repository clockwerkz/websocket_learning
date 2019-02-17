const expect = require('expect');
const { Users } = require('./users');

let users, user1, user2;

beforeEach(()=> {
    users = new Users();
    user1 = {
        id: 1,
        name: 'User1',
        room: 'Room1'
    };
    user2 = {
        id: 2,
        name: 'User2',
        room: 'Room2'
    };
});

describe('Users Class:',()=> {
    it('should add a new user', ()=>{
        const user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        };
        const resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    it('should return an array with user names of a room', ()=>{
        users.addUser(user1.id, user1.name, user1.room);
        const userList = users.getUserList(user1.room);
        expect(userList.length).toBe(1);
    });
});
