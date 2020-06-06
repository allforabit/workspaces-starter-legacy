import express from 'express';
import os from 'os';

export const app = express();

app.get('/', (req, res) => {
  res.status(200).send(`Hello, ${os.userInfo().username}!`);
});

app.get('/about', (req, res) => {
  res.send({ message: 'Hello, about page!' });
});
