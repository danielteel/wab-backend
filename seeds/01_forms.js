
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('forms').del()
    .then(function () {
      // Inserts seed entries
      return knex('forms').insert([
        {id: 1, data: 'im a form'},
        {id: 2, data: 'im a form as well'},
        {id: 3, data: 'mee too'}
      ]);
    });
};
