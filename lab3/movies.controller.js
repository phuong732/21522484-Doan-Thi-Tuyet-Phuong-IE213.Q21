static async apiGetMovieById(req, res, next) {
  try {
    let id = req.params.id;
    let movie = await MoviesDAO.getMovieById(id);
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.json(movie);
  } catch (e) {
    console.error(`API error: ${e}`);
    res.status(500).json({ error: e.message });
  }
}

static async apiGetRatings(req, res, next) {
  try {
    let ratings = await MoviesDAO.getRatings();
    res.json(ratings);
  } catch (e) {
    console.error(`API error: ${e}`);
    res.status(500).json({ error: e.message });
  }
}
