const mongoose = require('mongoose')

const opportunitySchema = new mongoose.Schema({
  opportunityName: {
    type: String,
    required: true
  },
  ownerOppor: {
    // References use the type ObjectId
    type: mongoose.Schema.Types.ObjectId,
    // the name of the model to which they refer
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = opportunitySchema
