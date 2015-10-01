# [coone][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Acts like [co@3](https://github.com/tj/co/tree/93fd2bb5e8803fdde15d95b3025b0b134904f4dc) and also is drop-in replacement for it. Built on top of [merz](https://github.com/hybridables/merz), actually thanks to [always-done](https://github.com/hybridables/always-done). But accept everything, not only generators - sync functions, async functions, callbacks and more. Flow-control for now and then.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i coone --save
```


## Usage
> For more use-cases see the [tests](./test.js) or try [examples](./examples)

### [coone](./index.js#L25)
> Co-ify everything!

- `<val>` **{Function|GeneratorFunction|Stream|Promise}** anything that [merz](https://github.com/hybridables/merz) accepts
- `return` **{Function}** which accepts only callback (thunk)

**Example**

```js
const coone = require('coone')
```

### Generators
> Same as in [`co@3`](https://github.com/tj/co/tree/93fd2bb5e8803fdde15d95b3025b0b134904f4dc), but better.

```js
const fs = require('fs')

/**
 * readFile
 */

function read (fp) {
  return (done) => {
    fs.readFile(fp, 'utf8', done)
  }
}

coone(function * () {
  const data = yield read('package.json')
  return JSON.parse(data)
})((err, json) => {
  if (err) return console.error(err)
  console.log(json.name) // => 'coone'
})
```

### JSON.stringify
> Specific use-case which shows correct and working handling of optional arguments.

```js
coone(JSON.stringify, {foo: 'bar'})((err, data)=> {
  if (err) return console.error(err)
  console.log(data) //=> {"foo":"bar"}
})

// result with identation
coone(JSON.stringify, {foo: 'bar'}, null, 2)((err, data) => {
  if (err) return console.error(err)
  console.log(data)
  // =>
  // {
  //   "foo": "bar"
  // }
})
```

### callback-style and sync functions
> Again, showing correct handling of optinal arguments using native `fs` module.

```js
const fs = require('fs')

// callback function
coone(fs.stat, 'package.json')((err, res) => {
  if (err) return console.error(err)
  console.log(res.isFile()) //=> true
})

// correct handling of optional arguments
coone(fs.readFile, 'package.json')((err, buf) => {
  if (err) return console.error(err)
  console.log(Buffer.isBuffer(buf)) //=> true
})

// read json file and parse it,
// because it will be utf8 string
coone(fs.readFileSync, 'package.json', 'utf-8')((err, data) => {
  if (err) return console.error(err)
  console.log(data.name) //=> 'coone'
})
```

### flatten multiple arguments by default
> If you pass more than two arguments to the callback, they will be flattened by default.

```js
coone((one, two, cb) => {
  cb(null, one, two, 33)
}, 11, 22)((err, res) => {
  if (err) return console.error(err)
  console.log(Array.isArray(res)) //=> true
  console.log(res) //=> [11, 22, 33]
})
```


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/coone/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/coone
[npmjs-img]: https://img.shields.io/npm/v/coone.svg?label=coone

[license-url]: https://github.com/hybridables/coone/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/hybridables/coone
[codeclimate-img]: https://img.shields.io/codeclimate/github/hybridables/coone.svg

[travis-url]: https://travis-ci.org/hybridables/coone
[travis-img]: https://img.shields.io/travis/hybridables/coone.svg

[coveralls-url]: https://coveralls.io/r/hybridables/coone
[coveralls-img]: https://img.shields.io/coveralls/hybridables/coone.svg

[david-url]: https://david-dm.org/hybridables/coone
[david-img]: https://img.shields.io/david/hybridables/coone.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg