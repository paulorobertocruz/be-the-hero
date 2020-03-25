
exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('non_profit_id').notNullable();
        table.foreign('non_profit_id').references('id').inTable('non_profits');
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('incidents');
};
