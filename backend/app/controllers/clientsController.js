// const Clients = require("../models/client.model");
// const sequelizeConnection = require("../../config/db.config.js");
// const bcrypt = require("bcrypt");

// const pool = require("../../config/db.config");


// const addClients = async (req, res) => {
//   try {
//     // CONNECT TO THE bodyBASE
//     await sequelizeConnection.authenticate();

//     // SYNC THE USER MODEL TO THE Clients TABLE
//     Clients.sync({ alter: true });

//     // // const add = await models.Clientss.add(req.body);
//     const create = await Clients.create(req.body);
//     return res.status(201).json({
//       create,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };




const getAllClients = async (req, res) => {
  try {
    // CONNECT TO THE bodyBASE
    // await sequelizeConnection.authenticate();

    // SYNC THE USER MODEL TO THE Clients TABLE
    // Clients.sync({ alter: true });

    // // const add = await models.Clients.add(req.body);
    // const findAll = await Clients.findAll(req.body);
    return res.status(200).json(
     { name: "string"},
    )

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



// const getOneClients = async (req, res) => {
//  //declare function & get params
//  const id = parseInt(req.params.id); // declare a variable that will use to locate each user

//  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//    // sequiliaze to get all userrs from the table
//    if (error) {
//      // if statement to catch errors if there's any
//      throw error; // if error found, throw it
//    }
//    res.status(200).json(results.rows); // the results of the sql statement
//  });
// };




// //update Clients
// const updateClients = async (req, res) => {
//   try {
//     // const id = req.params.id;
//     // CONNECT TO THE bodyBASE
//     await sequelizeConnection.authenticate();

//     // SYNC THE USER MODEL TO THE Clients TABLE
//     Clients.sync({ alter: true });
//     const update = await Clients.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     return res.status(201).json({
//       update,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });

//   }
// }


// //delete Clients
// const deleteClients = async (req, res) => {
//   try {
//     // const id = req.params.id;
//     // CONNECT TO THE bodyBASE
//     await sequelizeConnection.authenticate();

//     // SYNC THE USER MODEL TO THE Clients TABLE
//     Clients.sync({ alter: true });
    
//     const destroy = await Clients.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     return res.status(201).json({
//       destroy,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }


module.exports = {
//   addClients,
  getAllClients,
//   getOneClients,
//   updateClients,
//   deleteClients,
};
