[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/uuid-int.svg?style=flat-square
[npm-url]: https://npmjs.org/package/uuid-int
[travis-image]: https://img.shields.io/travis/wbget/uuid-int.svg?style=flat-square
[travis-url]: https://travis-ci.org/wbget/uuid-int
[codecov-image]: https://img.shields.io/codecov/c/github/wbget/uuid-int.svg?style=flat-square
[codecov-url]: https://codecov.io/github/wbget/uuid-int?branch=master
[david-image]: https://img.shields.io/david/wbget/uuid-int.svg?style=flat-square
[david-url]: https://david-dm.org/wbget/uuid-int
[snyk-image]: https://snyk.io/test/npm/uuid-int/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/uuid-int
[download-image]: https://img.shields.io/npm/dm/uuid-int.svg?style=flat-square
[download-url]: https://npmjs.org/package/uuid-int

# uuid-int

*inspired by snowflake.*   
uuid-int for nodejs .

[中文](./README.zh-CN.md)

## Quick Start

__Install__

```
npm install --save uuid-int
```

__Use__

```
const UUID = require('uuid-int');

// number  0 <= id <=511
const id = 0;

const generator = UUID(id);

const uuid = generator.uuid();
console.log(uuid); // 3270411116609537
```
