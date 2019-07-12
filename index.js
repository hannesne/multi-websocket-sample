const appInsights = require("applicationinsights");
appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY);
appInsights.start();
const appInsightsClient = appInsights.defaultClient;
const MultipathServer = require("./ws-multipath");
const http = require("http");
const WebSocket = require("ws");

try
{
    const port = process.env.PORT || 1337;
    console.log("Trying to start listening on port " + port);
    const server = new MultipathServer({ port: port });
    appInsightsClient.trackTrace({message: "started on port " + port});

    //const root = server.createHandler({ path: '/'});
    const foo = server.createHandler({ path: '/foo' });
    const bar = server.createHandler({ path: '/bar' });
    
    server.on('request', (req, response) => {
        console.dir("request for " + req.url);
        response.writeHead(204);
        response.end();
    });
    
    server.on('unhandled', (ws,req) => {
        console.dir("Unhandled request");
        console.dir(req);
    })

    server.on('error', (error) => {
        console.error(error);
    })

    // handle sockets connecting to ws://localhost:1234/foo
    foo.on('connection', (ws, req, path) => {
        console.dir(req);
        ws.send('hello from /foo!');
    });
    
    // handle sockets connecting to ws://localhost:1234/bar
    bar.on('connection', (ws) => {
        ws.send('hello from /bar!');
    });
}
catch (error)
{
    console.error(error);
    appInsightsClient.trackException({exception: error});
    throw error;
}


