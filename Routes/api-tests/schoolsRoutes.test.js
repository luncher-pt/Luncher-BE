const request = require('supertest');

const server = require('../../Server/server');
const db = require('../../data/dbConfig');

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
});