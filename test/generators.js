/*!
 * coone <https://github.com/hybridables/coone>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var mzfs = require('mz/fs')
var test = require('assertit')
var coone = require('../index')

function * success () {
  return yield mzfs.readFile('package.json', 'utf8')
}

function * failure () {
  return yield mzfs.readFile('foobar.json')
}

test('should handle successful generator function', function (done) {
  coone(success)(function (err, res) {
    test.ifError(err)
    test.strictEqual(typeof res, 'string')
    test.ok(res.indexOf('"license": "MIT"') !== -1)
    done()
  })
})

test('should handle generator function errors', function (done) {
  coone(failure)(function (err, res) {
    test.ifError(!err)
    test.ok(err instanceof Error)
    test.strictEqual(err.code, 'ENOENT')
    test.strictEqual(res, undefined)
    done()
  })
})
