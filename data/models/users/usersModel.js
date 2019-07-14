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
    if(typeof Number(id) !== 'number' || id === undefined) {
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

const editUser = async (id, update) => {
    const testKeys = Object.keys(userTemplate);
    const updateKeys = Object.keys(update);
    const updateVals = Object.values(update);

    const failedKeys = updateKeys.map(key => {
        if(!testKeys.includes(key)) {
            return true;
        }
    });

    //Check for update values
    const failedUpdate = updateVals.map(value => {
        if(value === undefined) {
            return { error: 'No Change Found' };
        }
    });

    //Determinate if update is valid
    if(failedUpdate[0]) {

        return failedUpdate[0];

    } else if (failedKeys[0]) {

        return { error: 'Field to Edit Not Found' }

    } else {
        await db('users').where({ id }).update(update);

        return await db('users').where({ id });
    }
}

const deleteUser = async id => {
    const deleted = await db('users').where({ id }).del();

    return deleted ? deleted : { error: 'No User Found' }
}

module.exports = {
    getUser,
    addUser,
    editUser,
    deleteUser
}