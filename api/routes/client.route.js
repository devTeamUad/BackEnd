const controllers = require("../controllers/clientController");
const express = require("express");
const Access  = require("../middlewares/Access")
const router = express.Router();


router.post("/", controllers.creerClient);

router.get("/", Access.Token, controllers.consulterTousLesClients);

router.get("/recherche/", controllers.rechercherclientparNom);

router.get("/:id", controllers.rechercherClient);

router.put("/:id", controllers.modifierClient);

router.put("/archiver/:id", controllers.archiverClient);

module.exports = router;
