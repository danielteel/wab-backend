
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('forms').del()
    .then(function () {
      // Inserts seed entries
      return knex('forms').insert([
        {id: 1333, pass: 1547, data: '"placeholder"'}
      ]);
    });
};
