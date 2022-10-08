# obfuscate mail

[![npm](https://img.shields.io/npm/v/obfuscate-mail)](https://www.npmjs.com/package/obfuscate-mail)
![Tests](https://github.com/rawpixel-vincent/obfuscate-mail/actions/workflows/node.js.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/rawpixel-vincent/obfuscate-mail/badge.svg)](https://coveralls.io/github/rawpixel-vincent/obfuscate-mail?branch=main)
[![CodeQL](https://github.com/rawpixel-vincent/obfuscate-mail/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/rawpixel-vincent/obfuscate-mail/actions/workflows/codeql-analysis.yml)
![license](https://img.shields.io/npm/l/obfuscate-mail)

Email addresses should never been displayed by an api unless specifically requested by a recently authentified user.

This node.js library gives the options to obfuscate email addresses will leaving them more or less identifiable.

```sh
npm install obfuscate-mail
```

```sh
yarn add obfuscate-mail
```

```js
const obfuscate = require('obfuscate-mail');
```

```js
import obfuscate from 'obfuscate-mail';
```

```js
obfuscate('example.example@example.com', {
  // asterisksLength: 6,
  // minimumNameObfuscationLength: 4,
  // visibleCharactersStartLength: 3,
  // visibleCharactersMiddleLength: 2,
  // visibleCharactersEndLength: 2,
  // showDomainName: false,
  // showDomainExtension: true,
  // invalidEmailValue: '*********@****.**',
});
```

> `=> exa***.e***le@***.com`

## Options

- `asterisksLength` - default `6`
- `minimumNameObfuscationLength` - default `4`
- `visibleCharactersStartLength` - default `3`
- `visibleCharactersMiddleLength` - default `2`
- `visibleCharactersEndLength` - default `2`
- `showDomainName` - default `false`
- `showDomainExtension` - default `true`
- `invalidEmailValue` - default `*********@****.**`

## Web assembly bundle

```sh
echo '{ "email": "asdas.sddas@dsdasd.gr", "options": {} }' | wasmtime dist/bundle.wasm
```

> `=> "exa***.e***le@***.com"%`

## [Test it with runKit](https://runkit.com/rawpixel-vincent/obfuscate-email)

## Examples

```js
const result = obfuscate('example@example.com');
expect(result).equal('exa******@***.com');
```

```js
const result = obfuscate('example.example@example.com');
expect(result).equal('exa***.e***le@***.com');
```

```js
const result = obfuscate('e@example.com');
expect(result).equal('******@***.com');
```

```js
const result = obfuscate('exa@example.com');
expect(result).equal('******@***.com');
```

```js
const result = obfuscate('examp@example.com');
expect(result).equal('e******@***.com');
```

```js
const result = obfuscate('example@example.com', {
  showDomainName: true,
});
expect(result).equal('exa******@example.com');
```

```js
const result = obfuscate('example.company+test@example.com', {
  asterisksLength: 12,
});
expect(result).equal('exa******mp******st@*********.com');
```

```js
const result = obfuscate('example@example.com', {
  showDomainName: true,
  showDomainExtension: false,
});
expect(result).equal('exa******@example.***');
```

```js
const result = obfuscate('company.name@test.com', {
  asterisksLength: 8,
  visibleCharactersStartLength: 2,
  visibleCharactersEndLength: 3,
  showDomainName: false,
});
expect(result).equal('co****ny****ame@*****.com');
```

```js
const result = obfuscate('company.name@test.com', {
  visibleCharactersStartLength: 4,
  visibleCharactersEndLength: 1,
  minimumNameObfuscationLength: 6,
});
expect(result).equal('comp***.***e@***.com');
```

```js
const result = obfuscate('company.name@test.com', {
  visibleCharactersStartLength: 3,
  visibleCharactersEndLength: 2,
  minimumNameObfuscationLength: 6,
});
expect(result).equal('com***y***me@***.com');
```

```js
const result = obfuscate('company.example@test.com', {
  visibleCharactersStartLength: 2,
  visibleCharactersMiddleLength: 3,
  visibleCharactersEndLength: 2,
  minimumNameObfuscationLength: 6,
});
expect(result).equal('co***y.e***le@***.com');
```

```js
const result = obfuscate('company.name@test.com', {
  visibleCharactersStartLength: 3,
  visibleCharactersEndLength: 2,
  minimumNameObfuscationLength: 10,
});
expect(result).equal('co******@***.com');
```

```js
const result = obfuscate('company.name@test.com', {
  visibleCharactersStartLength: 0,
  visibleCharactersEndLength: 4,
});
expect(result).equal('***pa***name@***.com');
```

```js
const result = obfuscate('email.without@domain-extension');
expect(result).equal('ema***wi***ut@***.***');
```

```js
const result = obfuscate('abcdefgh.ijklmno@domain.com', {
  visibleCharactersStartLength: 4,
  visibleCharactersMiddleLength: 4,
  visibleCharactersEndLength: 4,
});
expect(result).equal('abcd***gh.i***lmno@***.com');
```

```js
const result = obfuscate('invalid email');
expect(result).equal('*********@****.**');
```

```js
const result = obfuscate(null, { invalidEmailValue: 'invalid email' });
expect(result).equal('invalid email');
```
