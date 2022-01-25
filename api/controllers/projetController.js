const { projet } = require("../models");
const models = require("../models");
const Projet = models.projet;

exports.creerPojet = (req, res) => {
  Projet.find({ nom: req.body.nom })
    .exec()
    .then((affirmatif) => {
      if (affirmatif.length > 0)
        return res.status(200).json("ce projet existe deja");

      const creer = new Projet({
        nom: req.body.nom,
        but: req.body.but,
        // statut: req.body.statut,
        client: req.body.client,
        chef: req.body.chef,
      });
      console.log(req.body);
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

exports.consulterProjet = (req, res) => {
  const statut = req.query.archivage;
  if (req.query.archivage) {
    Projet.find({
      archive: statut,
    })
      .sort({
        nom: 1,
      })
      .populate("client")
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  } else {
    projet
      .find({})
      .sort({
        nom: 1,
      })
      .populate("client")
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  }
};

exports.consulterProjetsEnCours = (req, res) => {
  const savoir = req.query.stat;
  if (req.query.stat) {
    Projet.find({
      statut: savoir,
    })
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
  } else {
    Projet.find()
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

exports.consulterProjetsDunClient = (req, res) => {
  const id = req.params.idClient;
  Projet.find({
    client: id,
  })
    // .select("chef nom but statut archive clien")
    .populate("client chef")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterProjetsDunChef = (req, res) => {
  const id = req.params.idChef;
  Projet.find({
    chef: id,
  })
    // .select("chef nom but statut archive clien")
    .populate("client chef")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierProjet = (req, res) => {
  const modifier = {};
  const id = req.params.id;

  if (req.body.nom) modifier.nom = req.body.nom;
  if (req.body.but) modifier.but = req.body.but;
  if (req.body.archive) modifier.archive = req.body.archive;
  if (req.body.statut) modifier.statut = req.body.statut;

  Projet.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.archiverProjet = (req, res) => {
  const modifier = {};
  const id = req.params.id;
  modifier.archive = "archive";

  Projet.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierStatutProjet = (req, res) => {
  const modifier = {};
  const id = req.params.id;
  modifier.statut = req.body.statut;

  Projet.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
