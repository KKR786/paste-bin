const express = require('express')

const { createNewPaste, updatePaste, deletePaste } = require('../controllers/pasteController')
const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.post('/new', createNewPaste)
router.post('/delete', deletePaste)
router.patch('/:id', updatePaste)

module.exports = router