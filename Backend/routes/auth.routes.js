const express = require('express');
// const { user } = require('pg/lib/defaults');
const userController = require('../Controller/authContrller');
// const authAdminUser = require('../Authentication/authentication')
const router = express.Router();

//get all user's personal profiles - auth: admin only
router.get('/getAll/', userController.getAll);

//get all user's personal profiles - auth: admin only
router.get('/getAllModerators/', userController.getAllModerators);

//get all user's personal profiles - auth: admin only
router.get('/getAllclients/', userController.getAllclients);

//delete personal profile by id - auth: admin only
router.delete('/delete/:id', userController.delete);

//get personal profile by id - auth: host, guest, admin
router.get('/:id', userController.getOne);

//update user's profile by id auth: host, guest, admin
router.put('/updateOne/:id', userController.updateOne);

//update user's staatus by id auth: host, guest, admin
router.put('/updateUserStatus/', userController.updateUserStatus);

module.exports = router
