const express = require('express');
const { getTrendingMovies, getMoviesByGenre } = require('../controllers/movieController');
const auth = require('../config/auth');
const router = express.Router();

router.get('/trending', auth, getTrendingMovies);
router.get('/genre/:genreId', auth, getMoviesByGenre);

module.exports = router;