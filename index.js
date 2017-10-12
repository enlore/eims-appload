/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
'use strict'

const { resolve } = require('path')

const { IncomingForm } = require('formidable')
const exp = require('express')
const cor = require('cors')
const bod = require('body-parser')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')

const dbc = low(adapter)

dbc
  .defaults({ submissions: [], users: [] })
  .write()

const app = exp()

const config = {
  uploadDir: resolve(__dirname, 'uploads')
}

app.use(exp.static(resolve(__dirname, 'dist')))
app.use(bod.json())

app.post('/api/submission',
  cor(),
  (req, res) => {
    const form          = new IncomingForm()
    form.uploadDir      = config.uploadDir
    form.keepExtensions = true
    form.hash           = true

    form.parse(req, (err, fields, files) => {
      console.log(files)
      console.log(fields)

      const user = new User({ email: fields.email })

      const submission = new Submission({
        user: user.email,
        name: fields.appName,
        path: files.submission.path
      })


      let _user = dbc.get('users')
      .find({ email: user.email })
      .value()

      if (!_user) {
        dbc.get('users')
        .push(user)
        .write()

      } else {
        dbc.get('users')
        .find({ email: user.email })
        .assign(user)
        .write()
      }

      submission.user = user.email

      dbc.get('submissions')
      .push(submission)
      .write()

      return res.json({
        state: 'ok'
      })
    })
  })

const port = process.env.PORT || 8081

app.listen(port, () => {
  console.info(`Listening on ${port}`)
})

function Submission (opts) {
  this.path = opts.path
  this.name = opts.name
  this.user = opts.user && opts.user.toLowerCase() // sloppy
}

function User (opts) {
  this.email = opts.email;
}
