const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Materiel = require('./models/Materiel');
const Emprunt = require('./models/Emprunt');
var jsonParser = bodyParser.json();

// app.get('/', (req, res) => res.send('Hello world'));

// app.listen(3000, () => {
//     console.log('console log du back')
// })

app.use(express.json());        

mongoose.connect('mongodb+srv://Emmanuel:Emmanuel199627@cluster0.44jw3e7.mongodb.net/test',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log(err));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/createStudent', jsonParser, function (req, res) {
    console.log(req.body)
    const student = new Student({
        ...req.body
    });
    student.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
})

app.post('/api/addMateriel', jsonParser, function (req, res) {
    console.log(req.body)
    const materiel = new Materiel({
        ...req.body
    });
    materiel.save()
        .then(() => res.status(201).json({ message: 'Matériel enregistré !' }))
        .catch(error => res.status(400).json({ error }));
})

app.post('/api/addEmprunt', jsonParser, function (req, res) {
    console.log(req.body)
    const emprunt = new Emprunt({
        ...req.body
    });
    emprunt.save()
        .then(() => res.status(201).json({ message: 'Emprunt enregistré !' }))
        .catch(error => res.status(400).json({ error }));
})

app.use('/api/getAllStudents', function (req, res) {
    Student.find()
        .then(students => res.status(200).json(students))
        .catch(error => res.status(400).json({ error }));
})

app.use('/api/getAllEmprunts', function (req, res) {
    Emprunt.find()
        .then(emprunts => res.status(200).json(emprunts))
        .catch(error => res.status(400).json({ error }));
})

app.use('/api/getAllMateriels', function (req, res) {
    Materiel.find()
        .then(materiels => res.status(200).json(materiels))
        .catch(error => res.status(400).json({ error }));
})

app.put('/api/material/:id', (req, res, next) => {
    console.log(req.params.id)
    Materiel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Matériel modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

module.exports = app;