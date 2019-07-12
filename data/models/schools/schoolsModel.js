const db = require('../../dbConfig');

const schoolTemplate = {
    name: 'High School',
    address: 'Some Street',
    funds_required: 500,
    funds_donated: 0,
    admin_id: 1 
}

const getAllSchools = async () => {
    return await db('schools');
}

const getSchoolById = async id => {
    const school = await db('schools').where({ id });

    return school[0] === undefined ? { error: 'No School Found' }
                                   : school;
}

const addSchool = async school => {
    if(Object.keys(schoolTemplate).length !== Object.keys(school).length) {
        return { error: 'Missing Field' }
    }

    const [ id ] = await db('schools').insert(school);

    return id;
}

const deleteSchool = async id => {
    const deleted = await db('schools').where({ id }).del();

    return deleted ? deleted : { error: 'No School Found By ID' }
}


module.exports = {
    getAllSchools,
    getSchoolById,
    addSchool,
    deleteSchool
}