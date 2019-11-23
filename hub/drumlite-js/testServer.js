const io = require("socket.io");
const server = io.listen(3000);

server.on('connection', (socket) => {
    console.log("CONNECT");
    socket.on('test', (data) => console.log("DATA"));
});
