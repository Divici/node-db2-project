exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl =>{
    tbl.increments();
    tbl.text('vin').unique().notNullable();
    tbl.text('make').notNullable();
    tbl.text('model').notNullable();
    tbl.integer('mileage').notNullable();
    tbl.text('title').nullable();
    tbl.text('transmission').nullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
