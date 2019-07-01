const MultipathServer = require("ws-multipath");
const http = require("http");
const WebSocket = require("ws");

const server = new MultipathServer({ port: 80 });

const foo = server.createHandler({ path: '/foo' });
const bar = server.createHandler({ path: '/bar' });

// handle sockets connecting to ws://localhost:1234/foo
foo.on('connection', (ws, req, path) => {
    console.dir(req);
    ws.send('hello from /foo!');
});

// handle sockets connecting to ws://localhost:1234/bar
bar.on('connection', (ws) => {
    ws.send('hello from /bar!');
});