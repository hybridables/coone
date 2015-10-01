/*!
 * coone <https://github.com/hybridables/coone>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var fs = require('mz/fs')
var test = require('assertit')
var Bluebird = require('bluebird')
var coone = require('../index')

function resolvedPromise () {
  return Bluebird.resolve(123)
}

function rejectedPromise () {
  return Bluebird.reject(new Error('promise error'))
}

function successReadFile () {
  return fs.readFile('package.json', 'utf-8')
}

function failReadFile () {
  return fs.readFile('foo-bar')
}

test('should handle a resolved promise', function (done) {
  coone(resolvedPromise)(function (err, res) {
    test.ifError(err)
    test.strictEqual(res, 123)
    done()
  })
})

test('should handle a rejected promise', function (done) {
  coone(rejectedPromise)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should handle result of promised fs.readFile', function (done) {
  coone(successReadFile)(function (err, res) {
    test.ifError(err)
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    done()
  })
})

test('should handle error of promised fs.readFile', function (done) {
  coone(failReadFile)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(res, undefined)
    done()
  })
})

test('should return function which accept only callback (thunk)', function (done) {
  var thunk = coone(function (cb) {
    cb(null, 123)
  })
  thunk(function (err, res) {
    test.ifError(err)
    test.strictEqual(res, 123)
    test.strictEqual(typeof thunk, 'function')
    done()
  })
})
