const express = require('express');
const {
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist,
    updatePreferences,
} = require('../controllers/userController');
const auth = require('../config/auth');

const router = express.Router();


router.post('/watchlist', auth, addToWatchlist);
router.get('/watchlist', auth, getWatchlist);
router.delete('/watchlist/:movieId', auth, removeFromWatchlist);

router.put('/preferences', auth, updatePreferences);

module.exports = router;