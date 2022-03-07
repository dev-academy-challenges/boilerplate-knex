exports.seed = function (knex) {
  return knex('users').insert([
    { id: 99901, name: 'test user 1', email: 'test1@users.net' },
    { id: 99902, name: 'test user 2', email: 'test2@users.net' },
    { id: 99903, name: 'test user 3', email: 'test3@users.net' },
  ])
}
