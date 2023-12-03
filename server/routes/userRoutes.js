const express = require('express')

const { updateUserProfile, updateUserPassword, getUsers, searchFriend } = require('../controllers/userController')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/list', getUsers)
router.post('/search', searchFriend)

module.exports = router