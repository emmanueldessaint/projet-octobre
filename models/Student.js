const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  annee: { type: String, required: true },
});

module.exports = mongoose.model('Student', studentSchema);