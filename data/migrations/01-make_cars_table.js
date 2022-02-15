exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl =>{
    tbl.increments();
    tbl.string('vin', 17).unique().notNullable();
    tbl.string('make', 128).notNullable();
    tbl.string('model', 128).notNullable();
    tbl.integer('mileage').unsigned().notNullable();
    tbl.string('title', 128).nullable();
    tbl.string('transmission', 128).nullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
