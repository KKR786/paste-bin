const Sequence = require('./sequenceModel')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({
  _id: {
    type: Number
  },
  subject: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  user_id: {
    type: Number,
    required: true,
    ref: 'User'
  }
}, {id: false, timestamps: true});

notificationSchema.pre('save', async function (next) {
    if (this.isNew) {
      try {
        const sequenceDoc = await Sequence.findByIdAndUpdate(
          'notificationId',
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


module.exports = mongoose.model('Notifications', notificationSchema)