const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Student = require('./models/Student');

mongoose.connect('mongodb+srv://Emmanuel:Emmanuel199627@cluster0.44jw3e7.mongodb.net/test?retryWrites=true&w=majority',
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


// app.use((req, res, next) => {
//     console.log('Requête reçue !');
//     next();
// });

// app.use('/api/stuff', (req, res, next) => {
//     res.status(201);
//     next();
// });

app.post('/api/test', (req, res, next) => {
    console.log(req.body)
    res.status(201).json({ message : 'message du back'})
    // delete req.body._id;
    // const thing = new Student({
    //     ...req.body
    // });
    // thing.save()
    //     .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    //     .catch(error => res.status(400).json({ error }));
});

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff);
    // Student.find()
    //   .then(things => res.status(200).json(things))
    //   .catch(error => res.status(400).json({ error }));
});

module.exports = app;