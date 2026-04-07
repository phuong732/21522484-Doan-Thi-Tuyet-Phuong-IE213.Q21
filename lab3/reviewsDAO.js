import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) return;
    try {
      reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
    } catch (e) {
      console.error(`Unable to establish collection handle: ${e}`);
    }
  }

  static async addReview(movieId, review, userName, userId, date) {
    try {
      const reviewDoc = {
        movie_id: new ObjectId(movieId),
        review: review,
        user_name: userName,
        user_id: userId,
        date: date,
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to add review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, review, date) {
    try {
      return await reviews.updateOne(
        { _id: new ObjectId(reviewId), user_id: userId },
        { $set: { review: review, date: date } }
      );
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      return await reviews.deleteOne({ _id: new ObjectId(reviewId), user_id: userId });
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}