const models = require("../models/index");
const Client = models.client;

exports.creerClient = (req, res) => {
  Client.find({ nom: req.body.nom })
    .exec()
    .then((affirmatif) => {
      if (affirmatif.length > 0)
        return res.json({ message: "ce client existe déjà" });

      const creer = new Client({
        nom: req.body.nom,
        prenom: req.body.prenom,
        type: req.body.type,
        telephone: req.body.telephone,
        email: req.body.email,
        pays: req.body.pays,
        ville: req.body.ville,
        quartier: req.body.quartier,
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

exports.modifierClient = (req, res) => {
  const id = req.params.id;
  const modifier = {}; //type,telephone,email,archive, pays, ville, quartier

  if (req.body.nom) modifier.nom = req.body.nom;
  if (req.body.prenom) modifier.prenom = req.body.prenom;
  if (req.body.type) modifier.type = req.body.type;
  if (req.body.telephone) modifier.telephone = req.body.telephone;
  if (req.body.email) modifier.email = req.body.email;
  if (req.body.archive) modifier.archive = req.body.archive;
  if (req.body.pays) modifier.pays = req.body.pays;
  if (req.body.ville) modifier.ville = req.body.ville;
  if (req.body.quartier) modifier.quartier = req.body.quartier;

  Client.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.archiverClient = (req, res) => {
  const id = req.params.id;
  const modifier = {};
  modifier.archive = "archive";

  Client.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterTousLesClients = (req, res) => {
  const statut = req.query.archivage;
  if (req.query.archivage) {
    Client.find({
      archive: statut,
    })
      .sort({
        nom: 1,
      })
      .select("nom type telephone email pays")
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  } else {
    Client.find()
      .sort({
        nom: 1,
      })
      .populate()
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  }
};

exports.rechercherClient = (req, res) => {
  Client.findOne({
    id: req.params.id,
  })
    .exec()
    .then((positif) => {
      return res.status(201).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.rechercherclientparNom = (req, res) => {
  Client.find({
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
