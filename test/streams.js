/*!
 * coone <https://github.com/hybridables/coone>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('fs')
var path = require('path')
var test = require('assertit')
var through2 = require('through2')
var alwaysDone = require('../index')

var exists = path.join(__dirname, '../.gitignore')
var notExists = path.join(__dirname, '../not_exists')

var EndStream = through2.ctor(function (chunk, enc, cb) {
  this.push(chunk)
  cb()
}, function (cb) {
  this.emit('end', 2)
  cb()
})

function success () {
  var read = fs.createReadStream(exists)
  return read.pipe(new EndStream())
}

function failure () {
  var read = fs.createReadStream(notExists)
  return read.pipe(new EndStream())
}

function unpiped () {
  return fs.createReadStream(exists)
}

function unpipedFailure () {
  return fs.createReadStream(notExists)
}

test('should handle a successful stream', function (done) {
  alwaysDone(success)(function (err, res) {
    test.ifError(err)
    test.strictEqual(err, null)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should handle a successful stream and call the callback once', function (done) {
  alwaysDone(function (cb) {
    return success().on('end', function () { cb(null, 3) })
  })(function (err, res) {
    test.ifError(err)
    test.strictEqual(err, null)
    test.strictEqual(res, 3)
    done()
  })
})

test('should handle an errored stream', function (done) {
  alwaysDone(failure)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(err.code, 'ENOENT')
    test.strictEqual(res, undefined)
    done()
  })
})

test('should handle an error unpiped readable stream', function (done) {
  alwaysDone(unpipedFailure)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(err.code, 'ENOENT')
    test.strictEqual(res, undefined)
    done()
  })
})

test('should consume an unpiped readable stream', function (done) {
  alwaysDone(unpiped)(function (err, res) {
    test.ifError(err)
    test.strictEqual(err, null)
    test.strictEqual(res, undefined)
    done()
  })
})
