/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('blogs', (table) => {
    table.increments('id').primary();
    table.string('title', 500).notNullable();
    table.string('content', 1000).notNullable();
    table.timestamp('create_at').defaultTo(knex.fn.now());
    table.integer('user_id').unsigned().notNullable()
      .references('id').inTable('users').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('blogs');

};
