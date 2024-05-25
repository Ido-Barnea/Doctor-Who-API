import express from 'express';
import path from 'path';
import { router as mainRouter } from './routes/mainRouter';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`[Server] Listening on port ${PORT}.`);
});
