const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000', {
  perMessageDeflate: false
});
ws.on('open', function() {
    ws.send("test");
    setInterval(() => ws.send("hi"), 1000);
});

