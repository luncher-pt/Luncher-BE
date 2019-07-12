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

        it('should return an array containing a single user', async () => {
            await Users.addUser(mockUsers[0]);

            const user = await Users.getUser(1);

            expect(Array.isArray(user)).toBe(true);
            expect(user.length).toBe(1);
        });

        it('should return a user with the corresponding id as the parameter', async () => {
            await Users.addUser(mockUsers[0])
            
            const user = await Users.getUser(1);

            expect(user[0].id).toBe(1);
        });

        it('should return an empty array if no users found with id', async () => {
            const user = await Users.getUser(10);

            expect(Array.isArray(user)).toBe(true);
            expect(user.length).toBe(0)
        });

        it('should return an empty array if a non-number value is passed', async () => {
            const user1 = await Users.getUser('1');
            const user2 = await Users.getUser(undefined);

            expect(user1.length).toBe(0);
            expect(user2.length).toBe(0);
        });
    });

    describe('addUser()', () => {
        
        it('should add user to database', async () => {
            const succesfulAdd = await Users.addUser(mockUsers[0]);

            const userMatch = { ...mockUsers[0] };
            
            userMatch.id = 1;
            userMatch.admin = 1;

            expect(succesfulAdd[0]).toEqual(userMatch);
        });

        it('should return an error message if require field is missing', async () => {
            const failedAdd = await Users.addUser(mockUsers[1]);

            expect(failedAdd).toEqual({ error: 'Missing Field' });
        });

        it('should return an error message if a non object parameter is passed', async () => {
            const failedAdd = await Users.addUser(undefined);

            expect(failedAdd).toEqual({ error: 'No User Info Found' });
        });
    });

    describe('editUser()', () => {

        it('should change user fields', async () => {
            await Users.addUser(mockUsers[0]);

            const succesfulEdit = await Users.editUser(1, { password: 'password1' });
            const editedUser = await Users.getUser(1);
    
            const userMatch = { ...mockUsers[0] };
            
            userMatch.id = 1;
            userMatch.admin = 1;
            userMatch.password = 'password1';

            expect(succesfulEdit[0]).toEqual(userMatch);
            expect(editedUser[0].password).toBe('password1');
        });

        it('should return an error message if field not found', async () => {
            const failedEdit = await Users.editUser(1, { something: 'password1' });

            expect(failedEdit).toEqual({ error: 'Field to Edit Not Found' });
        });

        it('should return an error message if no changes found', async () => {
            const failedEdit = await Users.editUser(1, { password: undefined });

            expect(failedEdit).toEqual({ error: 'No Change Found' });
        });
    });

    describe('deleteUser()', () => {

        it('should remove the user from the database', async () => {
            await Users.deleteUser(1);

            const users = await db('users');

            expect(users[0].id).toBe(2);
        });

        it('should return an error message if no user matches id', async () => {
            const failedDelete = await Users.deleteUser(10);

            expect(failedDelete).toEqual({ error: 'No User Found' });
        });
    });
});