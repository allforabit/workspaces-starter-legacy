import express from 'express';

const app = express();

app.get('/users/:userId/friends/:friendId', (req, res) => {
  res.send(req.params);
});

app.listen(3001);

console.log('Listening on localhost:3001');
