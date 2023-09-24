const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();
app = express();

//Project 14 was the name of the file the local repo was in
const activity = cwd.includes('Project 14') ? cwd.split('Project 14')[1] : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
