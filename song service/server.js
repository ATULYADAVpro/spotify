import express from 'express';
import songRouter from './routes/songRoutes.js';
import connectDb from './configs/db.js';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 5003;

app.get('/', (req, res) => {
  res.send('Server started');
});

app.use('/api', songRouter);

(async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Song server started at http://localhost:${port}`);
  });
})();