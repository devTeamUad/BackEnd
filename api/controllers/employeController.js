const { find } = require("../models/Client");
const Financeur = require("../models/Financeur");
const { employe } = require("../models/index");
const models = require("../models/index");
const Employe = models.employe;

exports.creerEmploye = (req, res) => {
  Employe.find({ $and: [{ nom: req.body.nom }, { email: req.body.email }] })
    .exec()
    .then((affirmatif) => {
      if (affirmatif.length > 0)
        return res.json({ message: "cet employe existe deja" });

      const creer = new Employe({
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        email: req.body.email,
        grade: req.body.grade,
        poste: req.body.poste,
        aptitude: req.body.aptitude,
        sexe: req.body.sexe,
        dateNaissance: req.body.dateNaissance,
      });

      creer
        .save()
        .then((positif) => {
          return res.status(201).json(positif);
        })
        .catch((negatif) => {
          return res.status(500).json(negatif);
        });
    });
};

exports.consulterTousLesEmployes = (req, res) => {
  const status = req.query.archivage;
  if (req.query.archivage) {
    Employe.find({
      archive: status,
    })
      .sort({
        nom: 1,
      })
      .select("nom prenom email telephone poste grade aptitude sexe")
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  } else {
    Employe.find()
      .sort({
        nom: 1,
      })
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  }
};

exports.rechercherEmployes = (req, res) => {
  const id = req.params.id;
  Employe.findById(id)
    .exec()
    .then((positif) => {
      return res.status(201).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.rechercherEmployeparNom = (req, res) => {
  Employe.find({
    nom: req.body.nom,
  })
    .exec()
    .then((positif) => {
      return res.status(201).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierEmploye = (req, res) => {
  const modifier = {};
  const id = req.params.id;

  if (req.body.nom) modifier.nom = req.body.nom;
  if (req.body.prenom) modifier.prenom = req.body.prenom;
  if (req.body.telephone) modifier.telephone = req.body.telephone;
  if (req.body.email) modifier.email = req.body.email;
  if (req.body.grade) modifier.grade = req.body.grade;
  if (req.body.poste) modifier.poste = req.body.poste;
  if (req.body.sexe) modifier.sexe = req.body.sexe;
  if (req.body.dateNaissance) modifier.dateNaissance = req.body.dateNaissance;
  if (req.body.archive) modifier.archive = req.body.archive;

  Employe.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.archiverEmploye = (req, res) => {
  const id = req.params.id;
  const modifier = {};
  modifier.archive = "archive";

  Employe.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
