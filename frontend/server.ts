import express from 'express'
import os from 'os'

const app = express();

app.get('/', (req, res) => {
  res.send(`'Hello, ${os.userInfo().username}!'`);
})

app.get('/about', (req, res) => {
  res.send('Hello, about page!');
})

app.listen(3000);

console.log("Listening on localhost:3000");
