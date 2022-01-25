const controllers = require("../controllers/projetController");
const express = require("express");
const router = express.Router();

router.post("/", controllers.creerPojet);

router.get("/", controllers.consulterProjet);

router.get("/statut", controllers.consulterProjetsEnCours);

router.get("/projetsclient/:idClient", controllers.consulterProjetsDunClient);

router.get("/projets/chef/:idChef", controllers.consulterProjetsDunChef);

router.put("/:id", controllers.modifierProjet);

router.put("/archiver/:id", controllers.archiverProjet);

router.put("/statut/:id", controllers.modifierStatutProjet);

module.exports = router;
