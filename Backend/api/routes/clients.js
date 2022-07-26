

const { Router } = require("express");
const clientsController = require("../controllers/clientsControllers");
const router = Router();

//Add a tutorial
router.post('/v1/clients',clientsController. addClient);


//Delete a tutorial
router.delete('/v1/clients/:id', clientsController.deleteClient);


// Updates a tutorial 
router.put('/v1/clients/:id', clientsController.updateClient);



//Gets One tutorial by id
router.get('/v1/clients/:id',clientsController.getOneClient);

//Gets All tutorial
router.get('/v1/clients', clientsController.getAllClientS);

module.exports = router;