// // const Clients = require("..//models/employee.model");
// const sequelizeConnection = require("../../config/dbconfig");


// const addClient = async (req, res) => {
//   try {
//     // CONNECT TO THE bodyBASE
//     await sequelizeConnection.authenticate();

//     // SYNC THE USER MODEL TO THE Employeess TABLE
//     Clients.sync({ alter: true });

//     // // const add = await models.Employees.add(req.body);
//     const create = await Clients.create(req.body);
//     return res.status(201).json({
//       create,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };




// const getAllClients = async (req, res) => {
//   try {
//     // CONNECT TO THE bodyBASE
//     await sequelizeConnection.authenticate();

//     // SYNC THE USER MODEL TO THE Employeess TABLE
//     Clients.sync({ alter: true });

//     // // const add = await models.Employees.add(req.body);
//     const findAll = await Clients.findAll(req.body);
//     return res.status(201).json({
//       findAll,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };



// const getOneClient = async (req, res) => {
//   try {
//     // const id = req.params.id;
//     // CONNECT TO THE bodyBASE
//     await sequelizeConnection.authenticate();

//     // SYNC THE USER MODEL TO THE Employeess TABLE
//     Clients.sync({ alter: true });

//     // // const add = await models.Employees.add(req.body);
//     const findOne = await Clients.findByPk(req.params.id);
//     return res.status(201).json({
//       findOne,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };


// //update Employees
// const updateClient = async (req, res) => {
//   try {
//     // const id = req.params.id;
//     // CONNECT TO THE bodyBASE
//     await sequelizeConnection.authenticate();

//     // SYNC THE USER MODEL TO THE Employeess TABLE
//     Clients.sync({ alter: true });
//     const update = await Clients.update(req.body, {
//       // where: {
//       //   id: req.params.id,
//       // },
//     });
//     return res.status(201).json({
//       update,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });

//   }
// }


// //delete Employees
// const deleteClient = async (req, res) => {
//   try {
//     // const id = req.params.id;
//     // CONNECT TO THE bodyBASE
//     await sequelizeConnection.authenticate();

//     // SYNC THE USER MODEL TO THE Employeess TABLE
//     Clients.sync({ alter: true });
    
//     const destroy = await Clients.destroy({
//       // where: {
//       //   id: req.params.id,
//       // },
//     });
//     return res.status(201).json({
//       destroy,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }


// module.exports = {
//   addClient,
//   getAllClients,
//   getOneClient,
//   updateClient,
//   deleteClient,
// };