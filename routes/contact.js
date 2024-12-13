const express = require("express");
const router = express.Router();
const controllerContact = require("../controller/controller-contact");



// Route GET for the '/contact' page
router.get("/", controllerContact.getcontact);



module.exports = router;
