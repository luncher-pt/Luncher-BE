const db = require('../../dbConfig');
const Users = require('./usersModel');

const mockUsers = [
    {
        name: 'Jean-Luc Picard',
        email: 'enterprise@gmail.com',
        password: 'password',
        admin: true,
        donations: 100
    },
    {
        name: 'Jean-Luc Picard',
        email: 'enterprise@gmail.com',
        admin: true,
        donations: 100
    },
]

describe('USERS MODEL', () => {
    
    beforeEach(async () => {
        return await db('users').truncate();
    });

    describe('getUser()', () => {

        it('should return an array containing a single user', () => {
            const user = Users.getUser(1);

            expect(Array.isArray(user)).toBe(true);
            expect(user.length).toBe(1);
        });

        it('should return a user with the corresponding id as the parameter', () => {
            const user = Users.getUser(3);

            expect(user[0].id).toBe(3);
        });

        it('should return an empty array if no users found with id', () => {
            const user = Users.getUser(10);

            expect(Array.isArray(user)).toBe(true);
            expect(user.length).toBe(0)
        });

        it('should return an empty array if a non-number value is passed', () => {
            const user1 = Users.getUser('1');
            const user2 = Users.getUser(undefined);

            expect(user1.length).toBe(0);
            expect(user2.length).toBe(0);
        });
    });

    describe('addUser()', () => {
        
        it('should add user to database', () => {
            const succesfulAdd = Users.addUser(mockUsers[0]);

            expect(succesfulAdd).toBe(1);
        });

        it('should return an error message if require field is missing', () => {
            const failedAdd = Users.addUser(mockUsers[1]);

            expect(failedAdd).toEqual({ error: 'Missing Field' });
        });

        it('should return an error message if a non object parameter is passed', () => {
            const failedAdd = USers.addUser(undefined);

            expect(failedAdd).toEqual({ error: 'No User Info Found' });
        });
    });

    describe('editUser()', () => {

        it('should change user fields', () => {
            Users.addUser(mockUsers[0]);

            const succesfulEdit = Users.editUser(1, { password: 'password1' });
            const editedUser = Users.getUser(1);
    
            expect(succesfulEdit).toBe(1);
            expect(editedUser[0].password).toBe('password1');
        });

        it('should return an error message if field not found', () => {
            const failedEdit = Users.editUser(1, { something: 'password1' });

            expect(failedEdit).toEqual({ error: 'Field to Edit Not Found' });
        });

        it('should return an error message if no changes found', () => {
            const failedEdit = Users.editUser(1, { password: undefined });

            expect(failedEdit).toEqual({ error: 'No Change Found' });
        });
    });
    
});