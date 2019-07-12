const db = require('../../dbConfig');

const getUser = async id => {
    if(typeof id !== 'number' || undefined) {
        return [];
    }

    return await db('users').where({ id });
}

const addUser = async (user) => {
    const [ id ] = await db('users').insert(user);

    return await db('users').where({ id });
}

module.exports = {
    getUser,
    addUser
}