
exports.up = function(knex) {
  return knex.schema.createTable('forms', table=>{
      table.increments();
      table.json('data');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('forms');
};
