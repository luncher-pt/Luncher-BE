//Users Schema
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    //ID
    tbl.increments();

    //strings
    tbl.string('name').notNullable();
    tbl.string('password').notNullable();
    tbl.string('email').notNullable().unique();

    //integers
    tbl.integer('donations').defaultTo(0);

    //boolean
    tbl.boolean('admin').notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};