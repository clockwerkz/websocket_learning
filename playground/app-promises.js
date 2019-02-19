const users = [{
    id: 1,
    name: 'Carlos',
    schoolId: 101
},{
    id: 2,
    name: 'Jessica',
    schoolId: 202
}];
const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
},{
    id: 2,
    schoolId: 202,
    grade: 100
},{
    id: 3,
    schoolId: 101,
    grade: 80
},{
    id: 4,
    schoolId: 202,
    grade: 96
}];

const getUser = (id) => {
    return new Promise((resolve, reject)=> {
        const user = users.find(user => user.id === id);
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter(grade => grade.schoolId === schoolId));
    });
};

//Andrew has a 83% avg in the class
const getStatus = (userId) => {
    let user;
    return new Promise((resolve, reject)=> {
        getUser(userId)
            .then(userFound => {
                user = userFound;
                return getGrades(user.schoolId);
            })
            .then(grades => {
                const avg = parseInt(grades.reduce((acc, grade) => acc+=grade.grade,0)/grades.length);
                resolve(`${user.name} has a grade average of ${avg}%`);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

// async await

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    const avg = parseInt(grades.reduce((acc, grade) => acc+=grade.grade,0)/grades.length);
    return (`${user.name} has a grade average of ${avg}%`);
    return user;
}

getStatusAlt(2)
    .then((status) => console.log(status))
    .catch(err => console.log(err));
//getUser(3).then(user => console.log(user)).catch(e => console.log(e));
//getGrades(202).then(grades => console.log(grades));
// getStatus(2)
//     .then(result => console.log(result))
//     .catch(err => console.log(err));