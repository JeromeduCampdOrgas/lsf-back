const router = require("express").Router();
const refugesController = require("../controllers/refuges/refuges.controller");

///Obtenir toutes les catégories
router.get("/", refugesController.getAllRefuges);
//tous les produits d'une catégorie
router.get("/:refuge", refugesController.getAllRefugeChien);
//supprimer une catégorie
router.delete("/:refuge", refugesController.deleteOneChienRefuge);
//modifier le nom d'une catégorie
router.put("/:refuge", refugesController.updateOneRefuge);

module.exports = router;
