/*!
 * coone <https://github.com/hybridables/coone>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var coone = require('../index')
var simpleGet = require('simple-get')

/**
 * readFile
 */

function read (fp) {
  return function (done) {
    fs.readFile(fp, 'utf8', done)
  }
}

coone(function * () {
  var data = yield read('package.json')
  return JSON.parse(data)
})(function (err, json) {
  if (err) return console.error(err)
  console.log(json.name) // => 'coone'
})

/**
 * http request
 */

function get (url) {
  return function (done) {
    simpleGet.concat(url, done)
  }
}

coone(function * () {
  var res = yield get('http://www.tunnckocore.tk')
  var buf = res[0]
  var httpResponse = res[1]
  return buf.toString()
})(function (err, res) {
  if (err) return console.error(err)
  console.log(res.indexOf('<title>') !== -1) // => true
})
