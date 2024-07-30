const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/database');

const app = express();

connectDB();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('ping server');
})

app.use('/todos', require('./routes/todos.router'));   


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(5000, () => {
    console.log('Server running on port 5000');
    console.log("http://localhost:5000");
})