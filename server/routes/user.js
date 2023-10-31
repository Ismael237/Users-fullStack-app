const router = require("express").Router();
const { allUsers, findUserById, addUser, updateUser, deleteUser } = require("../controllers/user");

router.get("/", allUsers); 

router.get("/:id", findUserById);

router.post("/", addUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
