[
    {
        id: '/#1231212314', //socket.id
        name: 'Andrew',
        room: 'The Office Fans'
    }
]

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        const userToRemove = this.getUser(id);
        if (userToRemove) {
            this.users = this.users.filter(user => user.id !== id);
        }
        return userToRemove;
    }

    getUser (id) {
        return this.users.find(user =>user.id === id); 
    }

    getUserList(room) {
        const userList = this.users.filter(user =>user.room === room).map(user => user.name);
        return userList;
    }
}

module.exports = {Users}; 
