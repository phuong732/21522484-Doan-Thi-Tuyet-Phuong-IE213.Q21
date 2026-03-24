import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

export default app;

import moviesRouter from './api/movies.route.js';
app.use('/api/v1/movies', moviesRouter);
