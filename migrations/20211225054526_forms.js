
exports.up = function(knex) {
  return knex.schema.createTable('forms', table=>{
      table.increments();
      table.jsonb('data');
      table.string('pass');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('forms');
};