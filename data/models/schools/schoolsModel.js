const db = require('../../dbConfig');

const getAllSchools = async () => {
    return await db('schools');
}

const addSchool = async school => {
    const [ id ] = await db('schools').insert(school);

    return id;
}

module.exports = {
    getAllSchools,
    addSchool,
}