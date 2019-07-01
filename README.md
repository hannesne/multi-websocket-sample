# Sample for using `ws-multipath`

The purpose of this sample is to have a websocket server to be hosted on azure as a starting point.

## Running the server on Azure

1. Build the container

```bash
docker build -f ./Dockerfile -t {youraccount}/multi-ws:1 .
```

In my case I created a container on docker hub and pushed it there

```bash
docker push {youraccount}/multi-ws:1
```

2. Deploy container to Azure Container Instances

Read this short walkthrough how to create the instance and deploy the container

https://docs.microsoft.com/en-us/azure/container-instances/container-instances-quickstart

and don't forget to set expose port 80 through the portal or CLI.

3. Call the websocket endpoint

To test the connection you can use `wscat`.

https://github.com/websockets/wscat

```bash
wscat --connection ws://1.2.3.4/foo
wscat --connection ws://1.2.3.4/bar
```
