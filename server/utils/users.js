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
        const userList = this.users.filter(user => {
            if (user.room === room) {
                return user.name
            }
        });
        console.log(userList);
        return userList;
    }
}

module.exports = {Users}; 

const users = new Users();
users.addUser(2, 'Carlos', 'room');
users.addUser(3, 'Carlds', 'room2');
users.getUserList('room');
//removeUser(id)
//getUser(id)
//getUserList(room)