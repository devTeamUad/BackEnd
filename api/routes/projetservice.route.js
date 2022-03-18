const controllers = require("../controllers/projetserviceController");
const express = require("express");
const router = express.Router();

router.post("/", controllers.affecterServiceSurProjet);

router.get("/:id", controllers.consulterServicesDunprojet); // cete route n4est plus necessaire

router.get("/Rechercher/:id", controllers.RechercherFacturationParId);

router.get(
  "/",
  controllers.RechercherUneFacturationParProjetEtService
);

router.put("/:id", controllers.modifierFacturation);

router.put("/pourcent/:id", controllers.modifierPourcentageAvancement);

router.put("/modifier/statut/:id", controllers.modifierStatut);

router.put("/modifier/archive/:id", controllers.archiverFacturation);

module.exports = router;
