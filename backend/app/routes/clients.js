const { Router } = require("express");
const clientsController = require("../controllers/clientsController");
const router = Router();


const { register } = require("../controllers/register");
const { login } = require("../controllers/login");

// //Add a tutorial
// router.post('/v1/clients', clientsController. addClients);


// //Delete a tutorial
// router.delete('/v1/clients/:id', clientsController.deleteClients);


// // Updates a tutorial 
// router.put('/v1/clients/:id', clientsController.updateClients);



// //Gets One tutorial by id
// router.get('/v1/clients/:id', clientsController.getOneClients);

//Gets All tutorial
router.get('/v1/clients', clientsController.getAllClients);


router.post("/register", register); // Post request to register the clients
router.post("/login", login); //Post to login clients


module.exports = router;