const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express ();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const db = mongoose.connection;
db.on('error', function(){
  console.log('No se pudo conectar con MongoDB')
});
db.once('open', function(){
  console.log('Conectado con MongoDB')
});
mongoose.connect('mongodb+srv://ddaw-test:smEwneuETioTbV01@cluster0-hmnfa.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useFindAndModify: false});


const posts = require('./routes/api/posts');
const users = require('./routes/api/users');

app.use('/api/posts', posts);
app.use('/api/users', users);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port http://localhost:${port}`))


