const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db.js');
import { engine } from 'express-handlebars';

//loading the configiration
dotenv.config({ path: './config/config.env' });

//making the connection
connectDB();

const app = express();

// loggin with morga
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// handlebars
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

const PORT = process.env.PORT || 3030;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
