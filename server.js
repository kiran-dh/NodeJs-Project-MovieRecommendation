// to create and handel http server
const express = require('express');
// package to handel enviroment + to store secret
const dotenv = require('dotenv');
// importing funtion to connect to data base
const connectDB = require('./config/db');
// authentacation for users
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes =require('./routes/userRoutes');

dotenv.config();

// connect the server to mongoDB
connectDB();

const app = express();
app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port '+ PORT));
