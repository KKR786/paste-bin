const express = require('express')

const { updateUserProfile, updateUserPassword, getUsers, searchFriend } = require('../controllers/userController')
const { userAllPastes } = require('../controllers/pasteController')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/list', getUsers)
router.post('/search', searchFriend)
router.get('/paste/list', userAllPastes)

module.exports = router