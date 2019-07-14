const request = require('supertest')

const server = require('../../Server/server.js')
const db = require('../../data/dbConfig.js')

afterEach(async () => {
    return await db('users').truncate();
});

describe('LOGIN ROUTE', () => {
    it('should return 200 from SUCCESSFUL login', async () => {
        const mock_newUser = {
            name: "Billy",
            email: "Bill@Billy.com",
            password: "TacoMan",
            admin: false,
            donations: 0
        }
        const mock_loginUser = {
            email: "Bill@Billy.com",
            password: "TacoMan"
        }

        const register_mock_newUser = await request(server).post('/register').send(mock_newUser)
        const res = await request(server).post('/login').send(mock_loginUser)

        expect(res.status).toBe(200)
    })
})