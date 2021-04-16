
const express = require('express')
const router = express.Router()
const Account = require('../models/account')
const { handle404 } = require('./../../lib/custom_errors')
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// Create comment
router.post('/opportunities/:id', requireToken, (req, res, next) => {
  const opportData = req.body.opportunity
  const accountId = req.params.id
  Account.findById(accountId)
    .then(handle404)
    .then(account => {
      account.opportunities.push(opportData)
      return account.save()
    })
    .then(account => res.status(201).json({ account }))
    .catch(next)
})

module.exports = router
