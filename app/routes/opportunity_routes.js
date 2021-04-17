
const express = require('express')
const router = express.Router()
const Account = require('../models/account')
const { handle404 } = require('./../../lib/custom_errors')
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// Create
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

router.get('/opportunities', (req, res, next) => {
  const post = req.body.opportunity
  Account.findById(post)
    .then(handle404)
    .populate('opportunity.opportunities')
    .then(account => res.status(200).json({ opportunities: account.opportunities.toObject() }))
    .catch(next)
})

// UPDATE
router.patch('/opportunities/:opportunitiesId', requireToken, (req, res, next) => {
  const opportunitiesId = req.params.opportunitiesId
  const opportunityData = req.body.opportunity
  const accountId = opportunityData.accountId
  Account.findById(accountId)
    .then(handle404)
    .then(account => {
      const opportunity = account.opportunities.id(opportunitiesId)
      opportunity.set(opportunityData)
      return account.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Destroying a review
router.delete('/opportunities/:opportunitiesId', (req, res, next) => {
  const opportunitiesId = req.params.opportunitiesId
  const accountId = req.body.opportunity.accountId
  Account.findById(accountId)
    .then(handle404)
    .then(account => {
      account.opportunities.id(opportunitiesId).remove()
      // another syntax for deleting is
      // account.opportunities.pull(opportunitiesId)
      return account.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
