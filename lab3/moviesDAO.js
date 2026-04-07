static async getMovieById(id) {
  try {
    return await movies
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'movie_id',
            as: 'reviews',
          },
        },
      ])
      .next();
  } catch (e) {
    console.error(`Unable to get movie by id: ${e}`);
    return null;
  }
}

static async getRatings() {
  try {
    return await movies.distinct('rated');
  } catch (e) {
    console.error(`Unable to get ratings: ${e}`);
    return [];
  }
}
