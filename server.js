const {coinFlip, coinFlips, flipACoin, countFlips} = require("./coins.js")
const express = require('express');
const http = require('http');
const args = require('minimist')(process.argv.slice(2))
args['port']
const port = args.port || process.env.PORT || 5000

const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.get('/app/', (req, res) => {
// Respond with status 200
	res.statusCode = 200;
// Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

app.get('/app/flip/call/tails', (req, res) => {
  const result = flipACoin('tails')
  if(result=='win')
    res.status(200).json({ 'call': 'tails', 'flip': 'tails', 'result': result })
  else
    res.status(200).json({ 'call' : 'tails', 'flip': 'heads', 'result': result})
})

app.get('/app/flip/call/heads', (req, res) => {
    const result = flipACoin('heads')
    if(result=='win')
      res.status(200).json({ 'call': 'heads', 'flip': 'heads', 'result': result })
    else
      res.status(200).json({ 'call' : 'heads', 'flip': 'tails', 'result': result})
})

app.get('/app/flips/:number', (req, res)=> {
    const result = coinFlips(req.params.number)
    res.status(200).json({'raw' : result, 'summary' : countFlips(result)})
})

app.get('/app/flip/', (req, res) => {
    res.status(200).json({'flip': coinFlip()})
})
// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
})