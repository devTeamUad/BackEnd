const mongoose = require("mongoose");

const financeur_projetSchema = new mongoose.Schema(
  {
    financeur: {
      type: mongoose.Types.ObjectId,
      ref: "financeur",
      required: true,
    },
    projet: {
      type: mongoose.Types.ObjectId,
      ref: "projet",
      required: true,
    },

    //enlever  le type de financement
    type: {
      type: String,
      //required: true,
    },
    statut: {
      type: String,
      enum: ["encours", "terminé", "suspendu"],
      default: "encours",
    },
    montant: {
      type: Number,
      // required: true,
    },
    date_contrat: {
      type: Date,
      //required: true,
    },
    date_debut: {
      type: Date,
      //required: true,
    },
    date_fin: {
      type: Date,
      required: false,
    },
    periodicite: {
      type: String,
      required: false,
    },
    duree: {
      type: String,
      required: false,
    },
    date_retour_sur_investissement: {
      type: String,
      required: false,
    },
    montant_total: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("projet_financeur", financeur_projetSchema);
