const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
 
const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = process.env.mongoURI;

// Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./src/api/items'));
app.use('/api/users', require('./src/api/users'));
app.use('/api/auth', require('./src/api/auth'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
