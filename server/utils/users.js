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
        const user = this.getUser(id);
        if (user) {
            const index = this.users.indexOf(user);
            this.users = this.users.slice(0, index).concat(this.users.slice(index+1));
            console.log(this.users);
            return user;
        } else {
            console.log('unable to find user');
            return;
        }
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
