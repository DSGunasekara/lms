import User from "../Models/User.js";

export default async(role) => {
    const date = new Date().getFullYear();
    const users = await User.find({role});
    const count = users.length;
    let id = '';
    switch (role) {
        case 'Admin':
            id = 'AD'
            break;
        case 'Lecturer':
            id = 'LE'
            break;
        case 'Lab Instructor':
            id = 'LI'
            break;
        case 'Student':
            id = 'ST'
            break;
    } 
    let currentNumber = ('0000' + (count + 1)).slice(-4);
    id = id + date + currentNumber;
    return id;
}