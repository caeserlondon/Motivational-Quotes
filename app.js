const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

//loading the configiration
dotenv.config({ path: './config/config.env' });

//making the connection
connectDB();

const app = express();

const PORT = process.env.PORT || 3030;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
