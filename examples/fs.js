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
 * fs.readFileSync
 */

coone(fs.readFileSync, filepath, 'utf-8')(function (err, data) {
  if (err) return console.error(err)
  console.log(JSON.parse(data).name) // => 'coone'
})

/**
 * fs.readFile
 */

coone(fs.readFile, filepath, 'utf-8')(function (err, data) {
  if (err) return console.error(err)
  console.log(data.indexOf('"license": "MIT"') !== -1) // => true
})

/**
 * fs.stat
 */

coone(fs.stat, filepath)(function (err, stats) {
  if (err) return console.error(err)
  console.log(stats.isFile()) // => true
})
