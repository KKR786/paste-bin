const { default: mongoose } = require('mongoose');
const Paste = require('../models/pasteModel')

//create new Paste
const createNewPaste = async(req, res) => {
    const {paste, title, category, expiration, password, privacy} = req.body

    let emptyFields = [];
    if(!paste) {
        emptyFields.push('paste');
    }
    if(!title) {
        emptyFields.push('title');
    }
    if(!privacy) {
        emptyFields.push('privacy');
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill required fields', emptyFields })
    }
    try {
        const user_id = req.user._id
        const newPaste = await Paste.create({ paste, title, category, expiration, privacy, password, user_id })
        res.status(201).json(newPaste)
      } catch (error) {
        res.status(400).json({error: error.message, emptyFields})
      }
}

//update paste
const updatePaste = async(req, res) => {
    const { id } = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json({error: 'No Paste Found...'})
    }

    const updatedPaste = await Paste.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!updatedPaste) {
        return res.status(400).json({error: 'No Paste Found...'})
      }
    else {
    return res.status(200).json(updatedPaste)
    }
}

//delete a paste
const deletePaste = async(req, res) => {
    const { id } = req.params

    if( !mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json({error: 'No Paste Found...'})
    }

    const deletedPaste = await Paste.findOneAndDelete({ _id: id })

    if (!deletedPaste) {
        return res.status(400).json({error: 'No Paste Found...'})
      }
    else {
    return res.status(200).json(deletedPaste)
    }
}

module.exports = {
    createNewPaste,
    updatePaste,
    deletePaste
}