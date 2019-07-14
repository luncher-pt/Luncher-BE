const request = require('supertest')

const server = require('../../Server/server.js')
const db = require('../../data/dbConfig.js')

afterEach(async () => {
    return await db('users').truncate();
});

describe('REGISTER ROUTE', () => {
    it('should return 201 w/ CORRECT shape', async () => {
        const mock_newUser = {
            name: "Billy",
            email: "Bill@Billy.com",
            password: "TacoMan",
            admin: false,
            donations: 0
        }
        const res = await request(server).post('/register').send(mock_newUser)
        expect(res.status).toBe(201)
    })

    it('should return 422 w/ INCORRECT shape', async () => {
        const mock_newUser = {
            name: "Billy",
            password: "TacoMan",
        }
        const res = await request(server).post('/register').send(mock_newUser)
        expect(res.status).toBe(422)
    })
})