const mongoose = require('mongoose')

const opportunitySchema = new mongoose.Schema({
  opportunityName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = opportunitySchema
