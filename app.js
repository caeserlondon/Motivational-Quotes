const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db.js');
const { engine } = require('express-handlebars');

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

// static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'));

// PORT
const PORT = process.env.PORT || 3030;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
