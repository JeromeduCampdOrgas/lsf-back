const router = require("express").Router();
const authController = require("../controllers/users/auth.controller");
const userController = require("../controllers/users/user.controller");

//auth
router.post("/register", authController.signUp); //s'inscrire
router.post("/login", authController.signIn); //se loguer
router.get("/logout", authController.logout);

//user db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
