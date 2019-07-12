const request = require('supertest');

const server = require('../../Server/server');
const db = require('../../data/dbConfig');

const mockUser = {
    name: 'Jean-Luc Picard',
    email: 'enterprise@gmail.com',
    password: 'password',
    admin: true,
    donations: 100
}

beforeEach(async () => {
    return await db('users').insert(mockUser);
});

afterEach(async () => {
    return await db('users').truncate();
});

describe('USER ROUTES', () => {
   describe('GET /user/:id', () => {

        it('should return status 200 if successful', async () => {
            const res = await request(server).get('/users/1');

            expect(res.status).toBe(200);
        });

        it('should retun status 404 if ID is incorrect or not found', async () => {
            const res = await request(server).get('/users/10');

            expect(res.status).toBe(404);
        });
   });

   describe('PUT /users/:id', () => {
      
        it('should return status 200 if successful', async () => {
            const res = await request(server)
                                .put('/users/1')
                                .send({
                                    password: 'password123'
                                });

            expect(res.status).toBe(200);
        });

        it('should return status 304 if field is missing or incorrect', async () => {
            const res = await request(server)
                                .put('/users/1')
                                .send({
                                    something: 'password123'
                                });

            expect(res.status).toBe(304);
        });

        it('should return status 404 if ID is missing or incorrect', async () => {
            const res = await request(server)
                                .put('/useres/100')
                                .send({
                                    password: 'password23'
                                });

            expect(res.status).toBe(404);
        });
   });

   describe('DELETE /users/:id', () => {
        
        it('should return status 200 if successful', async () => {
            const res = await request(server).delete('/users/1');

            expect(res.status).toBe(200);
        });

        it('should return status 404 if ID is missing or incorrect', async () => {
            const res = await request(server).delete('/users/1000');

            expect(res.status).toBe(404);
        });
        
   });
});