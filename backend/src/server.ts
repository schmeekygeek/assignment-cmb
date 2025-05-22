import express from 'express';
import config from './config/config';

const app = express();

app.get('/hello', (_, res) => {
  res.send('Hello World!')
})

app.listen(config.port, () => {
  console.log(`Expressjs app listening on port ${config.port}`)
})
