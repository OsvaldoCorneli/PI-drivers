const { Router } = require("express");
const getAllDriversHandlers = require("../handlers/getAllDriversHandlers")
const sendToDatabase = require("../controllers/sendToDatabase");
const getByIdHandler = require("../handlers/getByIdHandler");
const createDriversHandler = require("../handlers/createDriverHandler");
// const getByNameHandler = require("../handlers/getByNameHandler");


const router = Router();

router.get("/drivers", getAllDriversHandlers) ;
router.get("/drivers/:idDriver", getByIdHandler);
router.post("/drivers",createDriversHandler);
// router.get("/teams", "")
 
module.exports = router;
