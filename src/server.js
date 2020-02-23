const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const fs = require('fs')
require('dotenv').config();


async function main () {

  const db = await initDatabase()
  // await db.migrate.latest()
  // await db.seed.run()

  const app = express();
  const insults = fs.readFileSync('data/insults.csv', 'utf8').split(',')

  app.use(bodyParser.urlencoded({ extended: false }));
  // text handler
  app.post('/', async function (req, res) {
    // parse args
    const methodName = req.body.Body.split('\n')[0].trim().toLowerCase()
    const args = textToJson(req.body.Body.toLowerCase())
    let resp = 'resp was not reset.'

    // path handling
    if (methodName == 'new budget') {
      resp = await addBudget(args, db)
    } else if (methodName == 'list budgets') {
        resp = await getBudgets(db)
    } else {
      // defaults to adding tx
      resp = await addTransaction(req.body.Body.toLowerCase(), db, insults)
    }
    
    // text me back!
    const twiml = new MessagingResponse();
    twiml.message(resp)
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  });

  // start server
  http.createServer(app).listen(8080, () => {
      console.log('Express server listening on port 8080');
  });
}

// transaction management

async function addTransaction(args, db, insults) {
  // build tx 
  let tx = {}
  const lines = args.split('\n')
  if (lines.length > 1) {
    tx['description'] = lines[1]
  }
  tx['amount'] = lines[0].split(' ')[1]
  const budget = lines[0].split(' ')[0]
  tx['category_id'] = db.select('id').from('budgets')
    .where('abbreviation', '=', budget)
    .orWhere('name', '=', budget)

  // write to db
  try {
    await db('transactions').insert(tx)
    return `Submitted, you ${insults[Math.floor(Math.random() * insults.length)]}!`
  } catch (e) {
    if (e.toString().endsWith('SQLITE_CONSTRAINT: NOT NULL constraint failed: transactions.category_id')) {
      return `Couldn't match to an existing budget`
    } else {
      return e.toString()
    }
  }
}

// budget management

async function addBudget(json, db) {
  try {
    await db('budgets').insert(json)
    return 'success'
  } catch (e) {
    return e.toString()
  }
}

async function getBudgets(db) {
  const resp = await db.select('name', 'amount', 'abbreviation').from('budgets')
  let budgets = 'Your current budgets:\n'
  resp.forEach( budgetObj => {
    budgets += `${budgetObj['name']} (${budgetObj['abbreviation']}), ${budgetObj['amount']}\n`
  })
  return budgets
}

// helpers

async function initDatabase() {
  const env = process.env.ENVIRONMENT || 'development'
  const knexfile = require('../knexfile')
  return require('knex')(knexfile[env])
}

function textToJson(text) {
  const textLines = text.split('\n').slice(1)
  json = {}
  textLines.forEach( line =>  { // expecting 'amount: 1231' format for each line
    const args = line.split(': ')
    const key = args[0]
    const value = args[1]
    json[key] = value
  })
  return json
}

main()
