import app from './app';
import 'dotenv/config';

const { PORT = 3000, NODE_ENV = 'development' } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}, ${NODE_ENV}`);
});
