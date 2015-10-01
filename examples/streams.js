/*!
 * coone <https://github.com/hybridables/coone>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var path = require('path')
var coone = require('../index')
var filepath = path.join(path.dirname(__dirname), 'package.json')

/**
 * sync function which accept arguments and retun
 * successful fs.createReadStream
 * @todo in merz/always-done/always-callback to read the stream contents
 */

coone(function (fp) {
  return fs.createReadStream(fp)
}, filepath)(function (err, res) {
  if (err) return console.error(err)
  console.log(res) // => undefined
})

/**
 * pure sync function that return
 * successful fs.createReadStream
 * @todo in merz/always-done/always-callback to read the stream contents
 */

coone(function () {
  return fs.createReadStream(filepath)
})(function (err, res) {
  if (err) return console.error(err)
  console.log(res) // => undefined
})

/**
 * directly passed stream to coone function
 * using the fs.createReadStream
 */

coone(fs.createReadStream(filepath))(function (err, res) {
  if (err) return console.error(err)
  console.log(res) // => undefined
})

/**
 * failing stream
 * just giving `fs.createReadStream` function
 * to coone function
 */

coone(fs.createReadStream, 'foobar.json')(function (err, res) {
  if (err) {
    console.error(err.code) // => 'ENOENT'
    return
  }
  console.log(res) // => undefined
})

/**
 * coone `fs.createReadStream` function
 */

coone(fs.createReadStream, filepath)(function (err, res) {
  if (err) return console.error(err)
  console.log(res) // => undefined
})
