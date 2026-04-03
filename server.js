const express = require('express');
const app = express();
require('dotenv').config(); //it should be first line of the nelow line
const db = require('./db');

// comming data converted into javascrip json formate
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // store the data in req.body

app.get('/', (req, res) => {
    res.send('Hello World here is my first FE and BE practice env!');
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});