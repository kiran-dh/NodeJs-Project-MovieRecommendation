const Watchlist = require('../models/Watchlist');
const User = require('../models/User');

exports.addToWatchlist = async (req, res) => {
    const { movieId, title, releaseDate } = req.body;

    try {
        let watchlist = await Watchlist.findOne({ user: req.user.id });

        if (!watchlist) {
            watchlist = new Watchlist({ user: req.user.id, movies: [] });
        }

        const movieExists = watchlist.movies.some((movie) => movie.movieId === movieId);
        if (movieExists) {
            return res.status(400).json({ message: "Movie already in watchlist" });
        }

        watchlist.movies.push({ movieId, title, releaseDate });
        await watchlist.save();

        res.status(200).json({ message: "Movie added to watchlist", watchlist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getWatchlist = async (req, res) => {
    try {
        const watchlist = await Watchlist.findOne({ user: req.user.id });

        if (!watchlist) {
            return res.status(404).json({ message: "Watchlist not found" });
        }

        res.status(200).json(watchlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.removeFromWatchlist = async (req, res) => {
    const { movieId } = req.params;

    try {
        const watchlist = await Watchlist.findOne({ user: req.user.id });

        if (!watchlist) {
            return res.status(404).json({ message: "Watchlist not found" });
        }

        watchlist.movies = watchlist.movies.filter((movie) => movie.movieId !== movieId);

        await watchlist.save();
        res.status(200).json({ message: "Movie removed from watchlist", watchlist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updatePreferences = async (req, res) => {
    const { preferences } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.preferences = preferences;
        await user.save();

        res.status(200).json({ message: "Preferences updated", preferences });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};