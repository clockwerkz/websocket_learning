const expect = require('expect');
const { Users } = require('./users');

const users = new Users();

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
const user3 = {
        id: 3,
        name: 'User3',
        room: 'Room1'
    };

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
    it('should return an array with user names of a room provided', ()=>{
        users.addUser(user1.id, user1.name, user1.room);
        const userList = users.getUserList(user1.room);
        expect(userList.length).toBe(1);
        expect(userList).toEqual(['User1']);
    });
    it('should remove a user', ()=> {
        users.addUser(user1.id, user1.name, user1.room);
        const userRemoved = users.removeUser(1);
        expect(userRemoved).toEqual(user1);
        expect(users.users.length).toBe(1);
    });
    it('should not remove user', ()=> {
        users.addUser(user1.id, user1.name, user1.room);
        const userRemoved = users.removeUser(2);
        expect(userRemoved).toEqual(undefined);
        expect(users.users.length).toBe(2);
    });
    it('should find user', ()=> {
        users.addUser(user1.id, user1.name, user1.room);
        const user = users.getUser(1);
        expect(user).toEqual(user1);
    });
    it('should not find a user', ()=> {
        users.addUser(user1.id, user1.name, user1.room);
        const user = users.getUser(2);
        expect(user).not.toEqual(user1);
    });
});
