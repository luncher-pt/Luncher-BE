//Schools Schema
exports.up = function(knex) {
  return knex.schema.createTable('schools', tbl => {
    //ID
    tbl.increments();

    //strings
    tbl.string('name').notNullable();
    tbl.string('address').notNullable().unique();
    
    //integers
    tbl.integer('funds_required').notNullable();
    tbl.integer('admin_id').notNullable();
    tbl.integer('funds_donated').defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('schools');
};