const express = require('express')

const { updateUserProfile, updateUserPassword, getUsers } = require('../controllers/userController')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/list', getUsers)

module.exports = router