exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('schools').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('schools').insert([
        {
          name: 'Patrick Henry High School',
          address: '111 Main Str, City, 55555',
          funds_required: 2500,
          funds_donated: 0,
          admin_id: 1
        },
        {
          name: 'Duke University',
          address: '2127 Campus Drive Box 90065. Durham, NC 27708',
          funds_required: 10000,
          funds_donated: 2000,
          admin_id: 3
        },
        {
          name: 'Massachusetts Institute of Technology',
          address: '77 Massachusetts Ave, Cambridge, MA 02139',
          funds_required: 25000,
          funds_donated: 10000,
          admin_id: 5
        },
        {
          name: 'Thomas Jefferson Elementary',
          address: '111 Town Rd, City, 33333',
          funds_required: 100,
          funds_donated: 0,
          admin_id: 1
        },
        {
          name: 'Patrick Henry High School',
          address: '111 Side Str, City, 55555',
          funds_required: 2500,
          funds_donated: 100,
          admin_id: 3
        },
      ]);
    });
};