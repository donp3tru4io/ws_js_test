var amqp = require('amqplib/callback_api');

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

   for ( i = 0; i < 10; i++) {
     var msg = 'Test message ' + i;
     channel.sendToQueue(queue, Buffer.from(msg));
     console.log(" [x] Sent %s", msg);
   }

  });
});
