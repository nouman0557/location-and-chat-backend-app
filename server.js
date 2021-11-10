require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const socket = require('socket/socket');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Server listening on port -->' + port);
});


// var app = require('express')();
// var http = require('http').createServer(app);
// const bodyParser = require('body-parser')
// const MongoClient = require('mongodb').MongoClient
// const connectionString = "mongodb+srv://firstDb:abc1234@cluster0.giizr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// const io = require('socket.io')(http, {
//     cors: {
//         origin: '*',
//     }
// });

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });


// app.use(bodyParser.urlencoded({ extended: true }))
// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//     .then(client => {
//         console.log('Connected to Database')
//         const db = client.db('location-database')
//         const userCollection = db.collection('userCol')
//         const locationHistoryCol = db.collection('locationHistoryCol')
//         const currentLocationCol = db.collection('currentLocationCol')
//         // ========================
//         // Middlewares
//         // ========================
//         app.use(bodyParser.urlencoded({ extended: true }))
//         app.use(bodyParser.json())

//         // ========================
//         // Routes
//         // ========================

//         app.get('/', (req, res) => {
//             res.send('hello!')
//         })

//         app.get('/welcome-frontend', (req, res) => {
//             console.log('welcome-frontend --->');
//             res.send('hello!')
//         })

//         //SOCKET CONNECTION START
//         io.on('connection', (socket) => {
//             console.log('Angular app is connected with Socket.io !!!');

//             // User Location Work Start 
//             socket.on('ping', (data) => {
//                 console.log('New Location From Frontend-->', data);
//                 socket.broadcast.emit('new-location', data);

//                 //Save Current Location 
//                 currentLocationCol.updateOne(
//                     { id: '1' },
//                     {
//                         $set: {
//                             id: '1',
//                             lat: data.lat,
//                             lng: data.lat
//                         }
//                     },
//                     { upsert: true }).then(result => {

//                         console.log('location Update Result--->', result)
//                     })

//                 //Save to Record as A History DB
//                 locationHistoryCol.insertOne(data)
//                     .then(result => {
//                         console.log('location History Result--->', result['acknowledged'])
//                     })
//                     .catch(error => console.error(error))

//             });

//             // User Messages Work Start
//             socket.on('message', (msg) => {
//                 console.log('This is msg rec from Frontend-->', msg);
//                 socket.broadcast.emit('message-broadcast', msg);
//             });

//         });
//         //SOCKET CONNECTION END
//         http.listen(3000, () => {
//             console.log('listening on --->:3000');
//         });

//     }).catch(error => console.error('Error From DB while connecting--->', error))
