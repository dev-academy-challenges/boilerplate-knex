exports.seed = (knex) => {
  return knex('users').del()

  // Chain calls to empty in order as required, e.g.
  // return knex('profiles')
  //   .del()
  //   .then(() => knex('users').del())
}
