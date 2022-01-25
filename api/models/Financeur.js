const mongoose = require("mongoose");

const financeurSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      maxlength: 60,
    },
    prenom: {
      type: String,
      required: false,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    statut: {
      type: String,
      enum: ["encours", "terminé", "suspendu"],
      default: "encours",
    },
    telephone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 20,
    },
    type: {
      type: String,
      required: true,
      enum: ["personne morale", "personne physique"],
    },
    qualite: {
      type: String,
      required: true,
      enum: ["donnateur", "investisseur"],
    },
    commentaire: {
      type: String,
      required: false,
    },
    pays: {
      type: String,
      required: true,
      maxlength: 40,
    },
    ville: {
      type: String,
      required: true,
      maxlength: 50,
    },
    quartier: {
      type: String,
      required: true,
    },
    archive: {
      type: String,
      enum: ["archive", "nonArchive"],
      default: "nonArchive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("financeur", financeurSchema);
