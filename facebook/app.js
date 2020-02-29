'use strict'

const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const amqp = require('amqplib/callback_api');
const amqpManager = require('amqp-connection-manager');
const unsafe = express.Router();
const bodyParser = require('body-parser');
const env = process.env;
const fs = require('fs');
const url = env.CONFIG_URL;
const errorHandling = require('../core/helpers/errorHandling');
const request = require('request');

http.globalAgent.maxSockets = 1000000000

app.use(cors())
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

unsafe.use(bodyParser.json())

request(
  url,
  {
    json: true
  },
  (err, result, body) => {
    const configJson = result.body
    const content = 'module.exports = ' + JSON.stringify(result.body)

    fs.writeFile('configuration.js', content, 'utf8', err => {
      if (err) {
        throw err
      } else {
        app.get('/', (req, res) => {
          res.send('Bouh!')
        })

        const port = process.env.APP_PORT || 8080
        app.listen(port, err => {
          console.log('max connection', app.maxConnections)
          console.log('serveur started at port', port)
        })
      }
    })
  }
)
