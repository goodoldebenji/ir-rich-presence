const irsdk = require('node-irsdk-2023');
const iracing = irsdk.init({
    telemetryUpdateInterval: 20000,
    sessionInfoUpdateInterval: 10000
})

const RPC = require("discord-rpc");
const rpc = new RPC.Client({
    transport: "ipc"
})



iracing.on('Connected', function () {
    console.log('iRacing telemetry connected')
})

iracing.on('Disconnected', function () {
    console.log('iRacing telemetry disconnected')
})

iracing.on('TelemetryDescription', function (evt) {
    console.log(evt)
})

iracing.on('Telemetry', function (evt) {
    console.log(evt)
})

iracing.on('SessionInfo', function (evt) {
    console.log(evt)
})

iracing.on('update', function (evt) {
    console.log(evt)
})

rpc.on("ready", () =>{
    iracing.on('SessionInfo', function (evt) {
        console.log(evt.data.WeekendInfo.TrackDisplayName);
        console.log(evt.data.WeekendInfo.EventType);
        rpc.setActivity({
            details: evt.data.WeekendInfo.TrackDisplayName,
            state: evt.data.WeekendInfo.EventType,
            startTimestamp: new Date(),
            largeImageKey: "logo",
            largeImageText: "iRacing Simulator"
        })
    })
    console.log("rpc active");
    iracing.on('Disconnected', function (evt) {
        rpc.clearActivity();
        console.log("disconnected");
    })
});

rpc.login({
    clientId: "822293878048292915"
})