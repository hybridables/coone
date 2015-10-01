/*!
 * coone <https://github.com/hybridables/coone>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

module.exports = function coone (val) {
  var self = this
  var args = require('sliced')(arguments, 1)
  return function (done) {
    require('merz').call(self || this, val).apply(self || this, args.concat(done))
  }
}
