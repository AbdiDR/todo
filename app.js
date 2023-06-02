const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // Import the cors package

const db = require('./database/models');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoute');
const todosRouter = require('./routes/todoRoute');

const app = express();

try {
  db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add CORS middleware before your routes
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todos', todosRouter);

module.exports = app;
