const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
// const exphbs = require('express-handlebars');

const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db.js');

//Loading the configiration
dotenv.config({ path: './config/config.env' });

// Passport config
require('/config/passport')(passport);

//making the connection
connectDB();

const app = express();

// Loggin with morga
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Handlebars
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

// Sessions
// app.set('trust proxy', 1); // trust first proxy
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
	})
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// PORT
const PORT = process.env.PORT || 3030;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
