// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const Account = require('../models/account')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// CREATE
// POST
router.post('/accounts', requireToken, (req, res, next) => {
  console.log('The user object:', req.user)
  console.log('The incoming event data:', req.body)
  const postData = req.body.account
  postData.owner = req.user._id

  Account.create(postData)
    .then(account => {
      res.status(201).json({ account })
    })
    .catch(next)
})

// SHOW ID
// GET
router.get('/accounts/:id', (req, res, next) => {
  Account.findById(req.params.id)
    .then(handle404)
    .then(account => res.status(200).json({ account: account.toObject() }))
    .catch(next)
})

// INDEX ALL
// GET
router.get('/accounts', (req, res, next) => {
  Account.find()
    .populate('owner')
    .populate('opportunity')
    .then(accounts => res.status(200).json({ accounts: accounts }))
    // if an error occurs, pass it to the handler

    .catch(next)
})

// UPDATE
// PATCH
router.patch('/accounts/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.account.owner
  Account.findById(req.params.id)
    .then(handle404)
    .then(account => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, account)
      // pass the result of Mongoose's `.update` to the next `.then`
      return account.updateOne(req.body.account)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
router.delete('/accounts/:id', requireToken, (req, res, next) => {
  Account.findById(req.params.id)
    .then(handle404)
    .then(account => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, account)
      // delete the example ONLY IF the above didn't throw
      account.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
