const mongoose = require('mongoose');

const empruntSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  annee: { type: String, required: true },
});

module.exports = mongoose.model('Emprunt', empruntSchema);