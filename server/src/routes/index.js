const { Router } = require("express");
const getAllDriversHandlers = require("../handlers/getAllDriversHandlers")
const getByIdHandler = require("../handlers/getByIdHandler");
const createDriversHandler = require("../handlers/createDriverHandler");
const getNameHamdler = require("../handlers/getByNameHandler");
const teamsHandler = require("../handlers/teamHandler");


// const getByNameHandler = require("../handlers/getByNameHandler");


const router = Router();

router.get("/drivers/name", getNameHamdler)
router.get("/drivers/:idDriver", getByIdHandler);
router.get("/drivers", getAllDriversHandlers) ;
router.post("/drivers",createDriversHandler);
router.get("/teams", teamsHandler)
 
module.exports = router;
