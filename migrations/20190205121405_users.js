
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

/*
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    // make timestamps for created_at and updated_at
    table.timestamps(true, true); 
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
*/
