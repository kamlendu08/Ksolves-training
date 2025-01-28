/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('blogs', (table) => {
    table.string('content', 1000).alter();
    table.string('title', 500).alter();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('blogs', (table) => {
    table.string('content', 255).alter();
    table.string('title', 500).alter();
  })

};
