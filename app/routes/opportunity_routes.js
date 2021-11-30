const express = require('express')
const router = express.Router()
const Account = require('../models/account')
const { handle404 } = require('./../../lib/custom_errors')
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// Create
router.post('/accounts/:id/opportunities', requireToken, (req, res, next) => {
  const opportData = req.body.opportunity
  const accountId = req.params.id
  Account.findById(accountId)
    .then(handle404)
    .then((account) => {
      account.opportunities.push(opportData)
      return account.save()
    })
    .then((account) => res.status(201).json({ account }))
    .catch(next)
})

// GET ALL
router.get('/accounts/:id/opportunities', (req, res, next) => {
  Account.findById(req.params.id)
    .populate('owner')
    .populate('opportunity.opportunities')
    .then(handle404)
    .then((account) =>
      res.status(200).json({ opportunities: account.opportunities.toObject() })
    )
    .catch(next)
})

// GET by ID
router.get('/accounts/:id/opportunities/:opportunitiesId', (req, res, next) => {
  const accountId = req.params.id
  Account.findById(accountId)
    .populate('owner')
    .populate('opportunity.opportunities')
    .then(handle404)
    .then((account) => {
      const opportunity = account.opportunities.id(req.params.opportunitiesId)
      return res.status(200).json({ opportunity: opportunity.toObject() })
      // return res.status(200).json(opportunity)
    })
    .catch(next)
})

// UPDATE
router.patch(
  '/accounts/:id/opportunities/:opportunitiesId',
  requireToken,
  (req, res, next) => {
    const opportunitiesId = req.params.opportunitiesId
    const opportunityData = req.body.opportunity
    const accountId = req.params.id
    Account.findById(accountId)
      .then(handle404)
      .then((account) => {
        const opportunity = account.opportunities.id(opportunitiesId)
        opportunity.set(opportunityData)
        return account.save()
      })
      .then(() => res.sendStatus(204))
      .catch(next)
  }
)

// DELETE
router.delete(
  '/accounts/:id/opportunities/:opportunitiesId',
  (req, res, next) => {
    const opportunitiesId = req.params.opportunitiesId
    const accountId = req.params.id
    Account.findById(accountId)
      .then(handle404)
      .then((account) => {
        account.opportunities.id(opportunitiesId).remove()
        // another syntax for deleting is
        // account.opportunities.pull(opportunitiesId)
        return account.save()
      })
      .then(() => res.sendStatus(204))
      .catch(next)
  }
)

module.exports = router
