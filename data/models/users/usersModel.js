const db = require('../../dbConfig');

//Compare Object Keys
const compareKeys = (obj1, obj2) => {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();

    return JSON.stringify(keys1) === JSON.stringify(keys2);
}

//For matching object keys
const userTemplate = {
    name: 'Jean-Luc Picard',
    email: 'enterprise@gmail.com',
    password: 'password',
    admin: true,
    donations: 100
}

const getUser = async id => {
    if(typeof id !== 'number' || undefined) {
        return [];
    }

    return await db('users').where({ id });
}

const addUser = async (user) => {
    if(typeof user !== 'object') {
        return { error: 'No User Info Found' }
    } else if (!compareKeys(user, userTemplate)) {
        return { error: 'Missing Field' }
    } else {
        const [ id ] = await db('users').insert(user);

        return await db('users').where({ id });
    }
}

module.exports = {
    getUser,
    addUser
}