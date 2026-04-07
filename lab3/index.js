import mongodb from 'mongodb';
import ReviewsDAO from './dao/reviewsDAO.js';

const MongoClient = mongodb.MongoClient;

MongoClient.connect(process.env.MOVIEREVIEWS_DB_URI)
  .then(async (client) => {
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
