const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddlleware, authUserMiddlleware } = require("../middleware/authMiddleware");

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logoutUser)
router.put('/update-user/:id',authUserMiddlleware, userController.updateUser)
router.delete('/delete-user/:id',authMiddlleware, userController.deleteUser)
router.get('/getAll',authMiddlleware, userController.getAllUser)
router.get('/get-details/:id',authUserMiddlleware, userController.getDetailsUser)
router.post('/refresh-token',userController.refreshToken)
router.post('/delete-many',authMiddlleware, userController.deleteMany)


module.exports = router