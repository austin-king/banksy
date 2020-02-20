exports.up = function(knex) {
  return knex.schema.createTable('budgets', function(t) {
      t.increments('id').unique().primary().notNullable()
      t.string('name').unique().notNullable()
      t.string('abbreviation').unique()
      t.integer('amount').notNullable()
    })
    .createTable('transactions', function(t) {
      t.increments('id').unique().primary().notNullable()
      t.float('amount').notNullable()
      t.integer('category_id').references('id').inTable('budgets').notNull().onDelete('RESTRICT')
      t.string('description')
      t.timestamp('created_at', { useTx: true }).defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('budgets')
    .dropTableIfExists('transactions')
}
