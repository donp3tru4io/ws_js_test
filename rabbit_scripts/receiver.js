var WebSocketServer = require('websocket').server;
var http = require('http');
var amqp = require('amqplib/callback_api');

function main(){

  console.log("starting ws server")

  var server = http.createServer(function(request, response) {});
  server.listen(9696, function() { });
  var serverwsServer = new WebSocketServer({
    httpServer : server
  });

  var last_connection = undefined;

  serverwsServer.on('request', function(request) {

      var wsconnection = request.accept(null, request.origin);
      last_connection = wsconnection;
      console.log("NEW LAST CONNECTION");
      wsconnection.on('close', function(wsconnection) {
    });
  });

  console.log("ws server started");
  console.log("starting rabbitmqreceiver");

  amqp.connect('amqp://user:password@localhost', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = 'test';

      channel.assertQueue(queue, {
        durable: false
      });
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
      channel.consume(queue, function(msg) {
        var msg = msg.content.toString();
        console.log(" [x] Received %s", msg);
        if (last_connection != undefined){
            last_connection.send(msg);
          } else {
            console.log("NO WS CONNECTION ESTABLISHED");
          }
        }, {
      noAck: true
      });
    });
  });

};

main();
