const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const db = require('../database/index');

app.use(express.static(path.join(__dirname, '/../client/dist')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/movies', (req, res) => {
  db.read((err, data) => {
    if(err) {
      res.statusMessage = 'Failed to get the movie lists from database';
      return res.status(500).end();
    }
    return res.send(data);
  }) 
})

app.post('/movies', (req, res) => {
  db.create(req.body, (err, data) => {
    if(err) {
      res.statusMessage = 'Failed to save the movie to database';
      return res.status(500).end();
    }
    return res.send(data);
  }) 
})

app.delete('/movies', (req, res) => {
  db.delete(req.body, (err) => {
    if (err) {
      res.statusMessage = 'Failed to delete the movie from database';
      return res.status(500).end();
    }
    return res.sendStatus(200);
  }) 
})

app.listen(3000, () => console.log('listening on port 3000'));


