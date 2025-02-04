require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./config/config');
const tasksRoutes = require('./routes/tasks');


const app = express();
dbConnection();
const PORT = 3000;

app.use(express.json());
app.use('/tasks', tasksRoutes);

app.listen (PORT, () => {
    console.log(`Express esta escuchandon en puerto http://localhost:${PORT}`)
});