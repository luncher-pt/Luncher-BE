const db = require('../../dbConfig');

const getAllSchools = async () => {
    return await db('schools');
}

const getSchoolById = async id => {
    const school = await db('schools').where({ id });

    return school[0] === undefined ? { error: 'No School Found' }
                                   : school;
}

const addSchool = async school => {
    const [ id ] = await db('schools').insert(school);

    return id;
}

module.exports = {
    getAllSchools,
    getSchoolById,
    addSchool,
}