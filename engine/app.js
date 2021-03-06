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

request(url, {
  json: true
}, (err, result, body) => {
  const configJson = result.body
  const content = 'module.exports = ' + JSON.stringify(result.body)

  fs.writeFile('configuration.js', content, 'utf8', function(err) {
    if (err) {
      throw err
    } else {
      console.log(configJson);
      let connection = amqpManager.connect([(configJson.socketServerEngine ? configJson.socketServerEngine : configJson.socketServer) + '/' + configJson.amqpHost]);
      let communication= require('./communication');
      var channelWrapper = connection.createChannel({
        json: true,
        setup: function(channel) {
          channel.assertQueue('work-ask', {
            durable: true
          })
          onConnect(channel);
          // `channel` here is a regular amqplib `ConfirmChannel`.
          // Note that `this` here is the channelWrapper instance.
          // return channel.assertQueue('rxQueueName', {
          //   durable: true
          // });
        }
      });
      // amqp.connect((configJson.socketServerEngine ? configJson.socketServerEngine : configJson.socketServer) + '/' + configJson.amqpHost, (err, conn) => {
      //   conn.createChannel((_err, ch) => {
      //     ch.assertQueue('work-ask', {
      //       durable: true
      //     })
      //     onConnect(ch)
      //   })
      // })
      const onConnect = (amqpClient) => {
        console.log("connected to amqp");
        communication.setAmqpClient(amqpClient);
        // require('./amqpService')(unsafe, amqpClient)
      }
      app.use('/engine', unsafe)
      communication.init(unsafe);
      let port = process.env.APP_PORT || 8080;
      app.listen(port, function(err) {
        console.log("listen at port ", port)
      })
      app.use((_err, req, res, next) => {
        if (_err) {
          errorHandling(_err, res, next)
        }
      })
    }
  })
})
