
exports.up = function (knex, Promise) {
  return knex.schema.createTable('gallery', (table) => {
    table.increments().primary();
    table.string('author').notNullable();
    table.string('link', 500).notNullable();
    table.text('description').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('gallery');
};
