const request = require('supertest');

const server = require('../../Server/server');
const db = require('../../data/dbConfig');

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

describe('SCHOOLS ROUTES', () => {
   
    beforeEach(async () => {
        return await db('schools').truncate();
    });

    describe('GET /schools', () => {
    
        it('should return status 200 if successful', async () => {
            const res = await request(server).get('/schools');

            expect(res.status).toBe(200);
        });

        it('should return a JSON packet', async () => {
            const res = await request(server).get('/schools');

            expect(res.type).toBe('application/json');
        });

        it('should return all schools in the database', async () => {
            const res = await request(server).get('/schools');

            expect(res.body.length).toBe(5);
        });
    });

    describe('POST /schools', () => {

        it('should add a school to the database', async () => {
            const res = await request(server)
                                .post('/schools')
                                .send(mockSchools[0]);

            expect(res.body).toBe(1);
        });

        it('should return status 201 if succesful', async () => {
            const res = await request(server)
                                .post('/schools')
                                .send(mockSchools[0]);

            exepct(res.status).toBe(201);
        });

        it('should return status 406 if missing a field', async () => {
            const res = await request(server)
                                .post('/schools')
                                .send(mockSchools[1]);

            expect(res.status).toBe(406);
        });

        it('should return status 400 if duplicate entry or school already found', async () => {
            await request(server)
                    .post('/schools')
                    .send(mockSchools[0]);

            const res = await request(server)
                                .post('/schools')
                                .send(mockSchools[0]);

            expect(res.status).toBe(400);
        });
    });

    describe('GET /schools/:id', () => {

        it('should return a single school', async () => {
            const res = await request(server).get('/schools/1');

            expect(res.body.length).toBe(1);
            expet(Array.isArray(res.body)).toBe(true);
        });

        it('should return status 200 if successful', async () => {
            const res = await request(server).get('/schools/1');

            expect(res.status).toBe(200);
        });

        it('should return status 404 if no school found', async () => {
            const res = await request(server).get('/schools/10');

            expect(res.status).toBe(404);
        });
    });
});