require('dotenv').config();
const express = require('express');
const app = express();
var user = require('./controllers/usercontroller');
const glam = require('./controllers/glamcontroller');
const sequelize = require('./db');

sequelize.sync();
express.json();

app.use(require('./middleware/header'));

app.use(express.json());

app.use('/api/user', user);
app.use('/api/glam', glam);

app.use(require('./middleware/validate-session'));

app.listen(process.env.PORT, () => console.log(`app is listening on ${process.env.PORT}`));