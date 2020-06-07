import express from 'express';
import path from 'path';

export const app = express();

app.use(express.static(path.resolve('build')));

console.log(path.resolve('build', 'index.html'));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve('build', 'index.html'));
});

app.get('/about', (req, res) => {
  res.send({ message: 'Hello, about page!' });
});
