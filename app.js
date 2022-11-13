const express = require('express');
const app = express();
const http = require('http');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Student = require('./models/Student');
const Materiel = require('./models/Materiel');
const Emprunt = require('./models/Emprunt');
var jsonParser = bodyParser.json();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var URL = 'mongodb+srv://Emmanuel:Emmanuel199627@cluster0.44jw3e7.mongodb.net/test';

const nodemailer = require("nodemailer");

app.use(express.json());
const db = mongoose.connection

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

app.use('/api/getAllStudents', function (req, res) {
    Student.find()
        .then(students => res.status(200).json(students))
        .catch(error => res.status(400).json({ error }));
})
app.post('/api/addEtudiant', jsonParser, function (req, res) {
    console.log(req.body)
    const student = new Student({
        ...req.body
    });
    student.save()
        .then(() => res.status(201).json({ message: 'Etudiant enregistré !' }))
        .catch(error => res.status(400).json({ error }));
})
app.delete('/api/deleteEtudiant/:id', (req, res, next) => {
    Student.deleteOne({ id: req.params.id })
        .then(() => res.status(201).json({ message: 'Etudiant supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    try {
        db.collection('emprunts').deleteMany({ id_etudiant: req.params.id });
    } catch (e) {
        print(e);
    }
});

app.use('/api/getAllEmprunts', function (req, res) {
    Emprunt.find()
        .then(emprunts => res.status(200).json(emprunts))
        .catch(error => res.status(400).json({ error }));
})

app.post('/api/addEmprunt', jsonParser, function (req, res) {
    // console.log(req.body)
    var student = {};
    const emprunt = new Emprunt({
        ...req.body
    });
    emprunt.save()
        .then(() => res.status(201).json({ message: 'Emprunt enregistré !' }))
        .catch(error => res.status(400).json({ error }));
    db.collection('students').findOne({ id: req.body.id_etudiant })
        .then(res => {
            student = res;
            console.log(res.mail)
            async function main() {
                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                // let testAccount = await nodemailer.createTestAccount();

                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    Service: "Hotmail",
                    auth: {
                        user: "mat_et_manu@hotmail.fr", // generated ethereal user
                        pass: "Rumutcho270?", // generated ethereal password
                    },
                    // host: "hotmail.fr",
                    // port: 587,
                    // secure: false, // true for 465, false for other ports
                    // auth: {
                    //     user: "mat_et_manu@hotmail.fr", // generated ethereal user
                    //     pass: "Rumutcho270?", // generated ethereal password
                    // },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: '"Emmanuel" <foo@example.com>', // sender address
                    to: res.mail, // list of receivers
                    // to: "xolav39705@sopulit.com", // list of receivers
                    subject: "Emprunt de matériel", // Subject line
                    text: "Emprunt de matériel", // plain text body
                    html: `<b>Bonjour ${res.prenom}, vous venez d'emprunter du matériel à la NWS.</b>`, // html body
                });

                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }

            main().catch(console.error);

            // console.log(res.mail)
        })
    .catch(error => res.status(400).json({ error }));
})

app.delete('/api/deleteEmprunt/:id', (req, res, next) => {
    console.log(req.params.id)
    Emprunt.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Emprunt supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});

app.use('/api/getAllMateriels', function (req, res) {
    Materiel.find()
        .then(materiels => res.status(200).json(materiels))
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

app.put('/api/updateMaterial/:id', (req, res, next) => {
    console.log(req.params.id)
    Materiel.updateOne({ id: req.params.id }, { ...req.body })
        .then(() => res.status(200).json({ message: 'Matériel modifié !' }))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/deleteMaterial/:id', (req, res, next) => {
    console.log(req.params.id)
    Materiel.deleteOne({ id: req.params.id })
        .then(
            Emprunt.deleteMany({ id_materiel: req.params.id })
                .then(() => res.status(200).json({ message: 'Matériel supprimé !' }))
                .catch(error => res.status(400).json({ error }))
        )
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;

// app.use(express.json());

// app.get('/', (req, res) => res.send('Hello world'));

// app.use('/api/getAllMateriels', function (req, res) {
//     Materiel.find()
//         .then(materiels => res.status(200).json(materiels))
//         .catch(error => res.status(400).json({ error }));
// })

// module.exports = app;