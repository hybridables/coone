/*!
 * coone <https://github.com/hybridables/coone>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var coone = require('../index')

/**
 * JSON.stringify without identation
 */

coone(JSON.stringify, {foo: 'bar'})(function (err, data) {
  if (err) return console.error(err)
  console.log(data) // => {"foo":"bar"}
})

/**
 * JSON.stringify with identation
 */

coone(JSON.stringify, {foo: 'bar'}, null, 2)(function (err, data) {
  if (err) return console.error(err)
  console.log(data)
  // =>
  // {
  //   "foo": "bar"
  // }
})

/**
 * JSON.parse
 */

coone(JSON.parse, '{"foo":"bar"}')(function (err, data) {
  if (err) return console.error(err)
  console.log(data.foo) // => 'bar'
})
