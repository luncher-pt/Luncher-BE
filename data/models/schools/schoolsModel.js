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
    console.log(Object.keys(schoolTemplate).length)
    console.log(Object.keys(school).length)


    if(Object.keys(schoolTemplate).length !== Object.keys(school).length) {
        return { error: 'Missing Field' }
    }

    const [ id ] = await db('schools').insert(school);

    return id;
}

const editSchool = async (id, update) => {
    //Determine if keys and properties are correct
    const testKeys = Object.keys(schoolTemplate);
    const updateKeys = Object.keys(update);
    const updateVals = Object.values(update);

    const failedKeys = updateKeys.map(key => {
        if(!testKeys.includes(key)) {
            return { error: "Incorrect Fields" }
        }
    });

    const failedUpdate = updateVals.map(value => {
        if(value === undefined) {
            return { error: "Incorrect Fields" }
        }
    });

    if(failedUpdate[0] || failedKeys[0]) return failedUpdate[0] || failedKeys[0]

    //Apply Update if School is found
    await db('schools').where({ id }).update(update);

    //Determine if school was found
    const result = await db('schools').where({ id });

    if(result.length > 0) return result;

    return { error: 'No School Found with ID' }     
}

const deleteSchool = async id => {
    const deleted = await db('schools').where({ id }).del();

    return deleted ? deleted : { error: 'No School Found By ID' }
}


module.exports = {
    getAllSchools,
    getSchoolById,
    addSchool,
    editSchool,
    deleteSchool
}