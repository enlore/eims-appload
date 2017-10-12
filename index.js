/* jshint node: true, asi: true, laxcomma: true, esversion: 6 */
'use strict'

const { resolve } = require('path')

const { IncomingForm } = require('formidable')
const cor = require('cors')
const exp = require('express')
const bod = require('body-parser')
const low = require('lowdb')

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

      return res.json({
        state: 'ok'
      })
    })
  })

const port = process.env.PORT || 8081

app.listen(port, () => {
  console.info(`Listening on ${port}`)
})
