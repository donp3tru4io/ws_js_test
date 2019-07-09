var socket = new WebSocket("ws://localhost:9696");

socket.onopen = function() {
  console.log(' ---> Connection opened');
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(' ---> Connection closed properly');
  } else {
    console.log(' ---> Connection reset');
  }
  console.log(' ---> Closing code: %s', event.code);
  console.log(' ---> Closing reason: %s', event.reason);
};

socket.onmessage = function(event) {
  console.log("Received data : %s", event.data);
};

socket.onerror = function(error) {
  console.log('ERROR : %s', error.message);
};
