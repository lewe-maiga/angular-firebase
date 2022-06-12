const express = require('express');

const stuffRouter = require('./routes/stuff');

const userRouter = require('./routes/user');

const path = require('path');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');




mongoose.connect('mongodb+srv://pipa_maiga:2119@cluster0.my0nn.mongodb.net/dbAgrinov?retryWrites=true&w=majority', 
{
  useNewUrlParser : true,
  useUnifiedTopology : true })
  .then(() => console.log('Connexion a MongoDB reussie !'))
  .catch(() => console.log('Connexion a MongoDB echouée !'));

const app = express();


app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());


app.use('/api/stuff', stuffRouter);

app.use('/api/auth', userRouter);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
