import express from 'express';

const app = express();
const port = 3000;

app.get('/hello', (_, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Expressjs app listening on port ${port}`)
})
