const db = require('../../dbConfig');
const Schools = require('./schoolsModel');

const mockSchools = [
    {
        name: 'High School',
        address: 'Some Street',
        funds_required: 500,
        funds_donated: 0,
        admin_id: 1 
    },
    {
        name: 'High School',
        address: 'Some Street',
        funds_donated: 0,
        admin_id: 1 
    },
]

describe('SCHOOLS MODEL', () => {

    beforeEach(async () => {
        return await db('schools').truncate();
    });


    describe('getAllSchools()', () => {
       
        it('should return an array', async () => {
            const schools = await Schools.getAllSchools();

            expect(Array.isArray(schools)).toBe(true);
        });

        it('should return all the schools in the database', async () => {
            await Schools.addSchool(mockSchools[0]);

            const schools = await Schools.getAllSchools();

            expect(schools.length).toBe(1);
        });

        it('should return an empty array is no schools found', async () => {
            const schools = await Schools.getAllSchools();

            expect(schools.length).toBe(0);
            expect(Array.isArray(schools));
        });
    });

    describe('getSchoolById()', () => {

        it('should return an array with a single shool', async () => {
            await Schools.addSchool(mockSchools[0]);
            
            const school = await Schools.getSchoolById(1);

            expect(Array.isArray(school)).toBe(true);
            expect(school.length).toBe(1);
        });

        it('should return the specified school', async () => {
            await Schools.addSchool(mockSchools[0]);

            const school = await Schools.getSchoolById(1);

            expect(school[0].id).toBe(1);
        });

        it('should return an error message if no school by ID found', async () => {
            const school = await Schools.getSchoolById(10);

            expect(school).toEqual({ error: 'No School Found' });
        }); 
    });

    describe('addSchool()', () => {

        it('should return the id if the school is successfully added', async () => {
            const successfulAdd = await Schools.addSchool(mockSchools[0]);

            expect(successfulAdd).toBe(1);
        });

        it('should add the school to the database', async () => {
            await Schools.addSchool(mockSchools[0]);
            
            const school = await Schools.getAllSchools();
          
            expect(school[0].name).toBe('High School');
        });

        it('should return an error message if a field is missing', async () => {
            const failedAdd = await Schools.addSchool(mockSchools[1]);

            expect(failedAdd).toEqual({ error: 'Missing Field' });
        });
    });

    describe('editSchool()', () => {

        it('should update a school\'s fields', async () => {
            await Schools.editSchool(1, { name: 'Middle School' });

            const school = await Schools.getSchoolById(1);

            expect(school[0].name).toBe('Middle School');
        });

        it('should return an error message if no school found', async () => {
            const failedEdit = await Schools.editSchool(10, { name: 'Middle School' });

            expect(failedEdit).toBe({ error: 'No School Found with ID' });
        });

        it('should return an error message if incorrect field is passed', async () => {
            const failedEdit = await Schools.editSchool(1, { something: 'Middle School' });

            expect(failedEdit).toEqual({ error: 'Incorrect Fields' });
        });
    });

    describe('deleteSchool()', () => {
        
        it('should remove a school from the database', async () => {
            await Schools.addSchool(mockSchools[0]);

            await Schools.deleteSchool(1);

            const schools = await Schools.getAllSchools();

            expect(schools.length).toBe(0);
        });

        it('should return an error message if no school found', async () => {
            const failedDelete = await Schools.deleteSchool(10);

            expect(failedDelete).toEqual({ error: 'No School Found By ID' });
        });
    });
});