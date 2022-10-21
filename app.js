const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Materiel = require('./models/Materiel');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json());             // for application/json
// app.use(express.urlencoded());

mongoose.connect('mongodb+srv://Emmanuel:Emmanuel199627@cluster0.44jw3e7.mongodb.net/test',
// mongoose.connect('mongodb+srv://Emmanuel:Emmanuel199627@cluster0.44jw3e7.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/createStudent', jsonParser, function (req, res) {
    // delete req.body._id;
    console.log(req.body)
    const student = new Student({
        ...req.body
    });
    student.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
})

app.post('/api/addMateriel', jsonParser, function (req, res) {
    // delete req.body._id;
    console.log(req.body)
    const materiel = new Materiel({
        ...req.body
    });
    materiel.save()
        .then(() => res.status(201).json({ message: 'Matériel enregistré !' }))
        .catch(error => res.status(400).json({ error }));
})

app.use('/api/getAllStudents', function (req, res) {
    Student.find()
        .then(students => res.status(200).json(students))
        .catch(error => res.status(400).json({ error }));
})

module.exports = app;