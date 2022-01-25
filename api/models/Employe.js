const mongoose = require("mongoose");

const employeSchema = new mongoose.Schema(
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

    telephone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    sexe: {
      type: String,
      required: true,
      enum: ["Masculin", "Feminin"],
      default: "Masculin",
    },

    grade: {
      type: String,
      required: false,
    },

    poste: {
      type: String,
      required: true,
    },

    aptitude: [
      {
        type: String,
        required: false,
      },
    ],

    dateNaissance: {
      type: Date,
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

module.exports = mongoose.model("employe", employeSchema);
