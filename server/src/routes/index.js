const { Router } = require("express");
const getAllDriversHandlers = require("../handlers/getAllDriversHandlers")
const sendToDatabase = require("../controllers/sendToDatabase");
const getByIdHandler = require("../handlers/getByIdHandler");



const router = Router();

router.get("/drivers", getAllDriversHandlers) 
router.get("/drivers/:idDriver", getByIdHandler)

// router.post("/drivers","")
// router.get("/teams", "")
 
module.exports = router;
