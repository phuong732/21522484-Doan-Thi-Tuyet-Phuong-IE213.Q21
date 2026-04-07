import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = req.body.movie_id;
      const review = req.body.review;
      const userInfo = req.body.userinfo;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        review,
        userInfo.name,
        userInfo.id,
        date
      );

      res.json({ status: 'success' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;
      const review = req.body.review;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        userId,
        review,
        date
      );

      if (reviewResponse.modifiedCount === 0) {
        throw new Error('Unable to update review. User may not be the author.');
      }

      res.json({ status: 'success' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;

      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);

      res.json({ status: 'success' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  }
}
