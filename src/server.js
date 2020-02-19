const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const fs = require('fs')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const insults = fs.readFileSync('../data/insults.csv', 'utf8').split(',')

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    const incoming = req.body.Body.split('\n')
    console.log(`category: ${incoming[0]}`)
    console.log(`amount: ${incoming[1]}`)

    twiml.message(`Thanks you ${insults[Math.floor(Math.random() * insults.length)]}!`)

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
});
