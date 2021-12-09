const io = require('../server');
const db = require('_helpers/db');
const locationHistory = db.locationHistory;
const currentLocation = db.currentLocation;

io.on('connection', (socket) => {

    // console.log('Angular app is connected with Socket.io !!');
    // console.log('Angular app is connected with Socket.io !!-->', io.engine.clientsCount);
    // console.log('This is Socket ID -->', socket.id)
    // console.log('This is io Object -->', io)`
    socket.on('message', message => {
        // msg = JSON.parse(message);
        console.log(message + "\n\n");
        socket.broadcast(io, message);
    });
    socket.on('close', io => {
        console.log(`Client disconnected. Total connected clients: ${socket.clients.size}`);
    })

    socket.on('error', error => {
        console.log(`Client error. Total connected clients: ${socket.clients.size}`);
    });

    socket.on('picUpLocation', (msg) => {
        console.log('This is picUpLocation from Frontend-->', msg);
    });

    socket.on('dropOffLocation', (msg) => {
        console.log('This is dropOffLocation from Frontend-->', msg);
    });

    socket.on('trackingLocation', (msg) => {
        console.log('This is msg rec from Frontend-->', msg);
        socket.broadcast.emit('trackingLocation', msg);
    });
    // User Location Work Start 
    socket.on('ping', (data) => {
        console.log('New Location From Frontend-->', data);
        socket.broadcast.emit('new-location', data);

        // Save Current Location 
        // currentLocation.updateOne(
        //     { id: '1' },
        //     {
        //         $set: {
        //             id: '1',
        //             lat: data.lat,
        //             lng: data.lat
        //         }
        //     },
        //     { upsert: true }).then(result => {

        //         console.log('location Update Result--->', result)
        //     })

        // Save to Record as A History DB
        // locationHistory.insertOne(data)
        //     .then(result => {
        //         console.log('location History Result--->', result['acknowledged'])
        //     })
        //     .catch(error => console.error(error))

    });

    socket.on('disconnect', (data) => {
        console.log("disconnect: ", socket.id);
    });

    // User Messages Work Start
    socket.on('message', (msg) => {
        console.log('This is msg rec from Frontend-->', msg);
        socket.broadcast.emit('message-broadcast', msg);
    });

});

module.exports = io;