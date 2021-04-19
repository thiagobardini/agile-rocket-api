const mongoose = require('mongoose')

const opportunitySchema = new mongoose.Schema({
  opportunityName: {
    type: String,
    required: true
  },
  stage: {
    type: String,
    required: true
  },
  probability: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  closeDate: {
    type: Date,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  ownerOppor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = opportunitySchema
