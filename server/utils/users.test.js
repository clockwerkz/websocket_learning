const expect = require('expect');
const { Users } = require('./users');

let users;

beforeEach(()=> {
    users = new Users();
    const user1 = {
        id: 1,
        name: 'User1',
        room: 'Room1'
    };
    const user2 = {
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
    it('should return a list of users belonging to a room', ()=> {
        it('should return the list of users that belong to a room', ()=> {
            const userList = users.getUserList('Room1');
            expect(userList.length).toBe(0);
        });
    });
});
