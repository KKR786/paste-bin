const express = require('express')

// controller functions
const { loginUser, getUsers, userRegistration } = require('../controllers/userController')
const { publicPastes } = require('../controllers/pasteController')

const router = express.Router()

//all users
router.get('/users', getUsers)

// auth routes
router.post('/user/login', loginUser)
router.post('/user/registration', userRegistration)

router.get('/paste/public/list', publicPastes)



module.exports = router