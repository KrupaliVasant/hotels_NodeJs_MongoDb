const express = require('express');
const app = express();
require('dotenv').config(); //it should be first line of the nelow line
const db = require('./db');
const passport = require('./auth');

// comming data converted into javascrip json formate
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // store the data in req.body

const PORT = process.env.PORT || 3000;

// Middleware function
// const logRequest = (req, res, next) => {
//     console.log(`[${new Date().toLocalString()}] Request Made to: ${req.originalUrl}`);
//     next(); //Move to the next phase
// };

//app.use(logRequest); // Apply the middleware to all routes

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', (req, res) => {
    res.send('Welcome to our HOTEl!!!');
});

app.get('/home', (req, res) => {
    res.send('Welcome to home page!');
});

app.get('/contact', (req, res) => {
    var contact_details = {
        name: 'Ram',
        mobile_no: '1234567890',
        email_id: 'ram@gmail.com',
        age: 30
    }
    res.send(contact_details)
});

// Import the router files
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menuitem', menuItemRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});