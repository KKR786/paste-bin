const Sequence = require('./sequenceModel')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pasteSchema = new Schema({
  _id: {
    type: Number
  },
  paste: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  expiration: {
    type: String
  },
  privacy: {
    type: Number,
    required: true
  },
  password: {
    type: String
  },
  user_id: {
    type: Number,
    required: true,
    ref: 'User'
  }
}, {id: false, timestamps: true});

pasteSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const sequenceDoc = await Sequence.findByIdAndUpdate(
          'pasteId',
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
        ).exec();
  
        this._id = sequenceDoc.sequence_value;
      } catch (err) {
        return next(err);
      }
    }
  
    next();
  });


module.exports = mongoose.model('Paste', pasteSchema)