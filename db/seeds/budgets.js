
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('budgets').del()
    .then(function () {
      // Inserts seed entries
      return knex('budgets').insert([
        {id: 1, name: 'music', abbreviation: 'm', amount: 120},
        {id: 2, name: 'bars', abbreviation: 'b', amount: 140},
        {id: 3, name: 'coffee shops', abbreviation: 'cs', amount: 30},
        {id: 4, name: 'weekday food', abbreviation: 'wf', amount: 208},
        {id: 5, name: 'weekend food', abbreviation: 'ef', amount: 368},
        {id: 6, name: 'health', abbreviation: 'h', amount: 100},
        {id: 7, name: 'sports', abbreviation: 's', amount: 100},
        {id: 8, name: 'rent', abbreviation: 'r', amount: 1200},
        {id: 9, name: 'hair', abbreviation: 'ha', amount: 67},
        {id: 10, name: 'books', abbreviation: 'bo', amount: 40},
        {id: 11, name: 'clothing', abbreviation: 'c', amount: 250},
        {id: 12, name: 'travel', abbreviation: 't', amount: 500},
        {id: 13, name: 'ride sharing', abbreviation: 'rs', amount: 360},
      ]);
    });
};
