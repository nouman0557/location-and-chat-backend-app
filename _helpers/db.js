const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions)
    .then(client => {
        console.log('Connected to Database !!')
    }
    ).catch(error => console.error('Error From DB while connecting -->', error));
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),

};

// locationHistory: require('../models/locationHistory.model')