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
    // References use the type ObjectId
    type: mongoose.Schema.Types.ObjectId,
    // the name of the model to which they refer
    ref: 'User'
  }
})

module.exports = opportunitySchema
