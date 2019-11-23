const io = require('socket.io-client');
const socket = io.connect("http://localhost:3000");
//const socket = io.connect("http://10.0.0.27:3000");

socket.on('connect', () => {
    console.log("connected");

    socket.on('disconnect', () => {
        console.log('disconnected');
    });

    socket.emit("test", "foo");
    setInterval(() => {
        console.log("Sending bar");
        socket.emit("test", "bar");
    }, 1000);
});
