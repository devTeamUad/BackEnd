const { projetService } = require("../models");
const models = require("../models");
const Projet = require("../models/Projet");
const ProjetService = models.projetService;

exports.affecterServiceSurProjet = (req, res) => {
  const creer = new projetService({
    service: req.body.service,
    projet: req.body.projet,
    montant: req.body.montant,
    date_contrat: req.body.date_contrat,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
  });
  creer
    .save()
    .then((positif) => {
      return res.status(201).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.consulterServicesDunprojet = (req, res) => {
  ProjetService.find({
    projet: req.params.id,
  })
    .populate("projet service")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
//pour la fonctionnalité ci-dessus, ca naffiche pas le pourcentage davancement, ni celui de reglement de la fqacture.

exports.RechercherFacturationParId = (req, res) => {
  const id = req.params.id;
  ProjetService.findById({
    _id: id,
  })
    .populate("projet service")
    .exec()
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.RechercherUneFacturationParProjetEtService = (req, res) => {
  const proj = req.query.idp;
  const serv = req.query.ids;

  if (req.query.idp || req.query.ids) {
    ProjetService.find({
      projet: proj,
      service: serv,
    })
      .populate("projet service")
      .exec()
      .then((positif) => {
        return res.status(200).json(positif);
      })
      .catch((negatif) => {
        return res.status(500).json(negatif);
      });
  }
};

exports.modifierFacturation = (req, res) => {
  const id = req.params.id;
  const modifier = {};
  if (req.body.service) modifier.service = req.body.service;
  if (req.body.projet) modifier.projet = req.body.projet;
  if (req.body.montant) modifier.montant = req.body.montant;
  if (req.body.pourcentage_avancement)
    modifier.pourcentage_avancement = req.body.pourcentage_avancement;
  if (req.body.poucentage_reglement_facture_totale)
    modifier.oucentage_reglement_facture_totale =
      req.body.oucentage_reglement_facture_totale;
  if (req.body.statut) modifier.statut = req.body.statut;
  if (req.body.date_contrat) modifier.date_contrat = req.body.date_contrat;
  if (req.body.date_debut) modifier.date_debut = req.body.date_debut;
  if (req.body.date_fin) modifier.date_fin = req.body.date_fin;

  ProjetService.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierPourcentageAvancement = (req, res) => {
  const id = req.params.id;
  const modifier = {};

  if (req.body.pourcentage_avancement)
    modifier.pourcentage_avancement = req.body.pourcentage_avancement;

  ProjetService.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.modifierStatut = (req, res) => {
  const id = req.params.id;
  const modifier = {};

  if (req.body.statut) modifier.statut = req.body.statut;

  ProjetService.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};

exports.archiverFacturation = (req, res) => {
  const modifier = {};
  const id = req.params.id;
  modifier.archive = "archive";

  ProjetService.updateOne({ _id: id }, { $set: modifier })
    .then((positif) => {
      return res.status(200).json(positif);
    })
    .catch((negatif) => {
      return res.status(500).json(negatif);
    });
};
