const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT;

const todoListRoutes = require('./src/routes/todoListRoutes');

app.use(cors());

app.use(express.json());
app.use('/todolist', todoListRoutes);

app.listen(port, () => {
  console.log(`listening and running at http://localhost:${port}`);
});