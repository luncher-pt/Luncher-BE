exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Bernard Johnson',
          email: 'email@gmail.com',
          password: 'password',
          admin: true,
          donations: 0
        },
        {
          name: 'Ricky Bobby',
          email: '1storLast@gmail.com',
          password: 'password',
          admin: false,
        },
        {
          name: 'Hank Hill',
          email: 'propane@gmail.com',
          password: 'password',
          admin: true,
          donations: 150000
        },
        {
          name: 'Peter Parker',
          email: 'webslinger@gmail.com',
          password: 'password',
          admin: false,
          donations: 10
        },
        {
          name: 'Bernard Johnson III',
          email: 'emailzzz@gmail.com',
          password: 'password',
          admin: true,
          donations: 1
        },
      ]);
    });
};
