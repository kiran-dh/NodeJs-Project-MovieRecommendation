const axios = require('axios');

exports.getTrendingMovies = async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`);
        res.status(200).json(response.data.results);
    } catch (err) {
        res.status(500).json({ message: "Error fetching movies" });
    }
};

exports.getMoviesByGenre = async (req, res) => {
    const { genreId } = req.params;

    try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genreId}`);
        res.status(200).json(response.data.results);
    } catch (err) {
        res.status(500).json({ message: "Error fetching movies" });
    }
};