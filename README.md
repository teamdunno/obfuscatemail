# obfuscate mail

![Tests](https://github.com/rawpixel-vincent/obfuscate-mail/actions/workflows/node.js.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/rawpixel-vincent/obfuscate-mail/badge.svg)](https://coveralls.io/github/rawpixel-vincent/obfuscate-mail?branch=main)
![license](https://img.shields.io/npm/l/obfuscate-mail)
![npm](https://img.shields.io/npm/v/obfuscate-mail)
![size](https://img.shields.io/bundlephobia/minzip/obfuscate-mail)
![downloads](https://img.shields.io/npm/dw/obfuscate-mail)

Email addresses should never been displayed by an api unless specifically requested by a recently authentified user.

This node.js library gives the options to obfuscate email addresses will leaving them more or less identifiable.

```sh
npm install obfuscate-mail
yarn add obfuscate-mail
```

```js
const obfuscate = require('obfuscate-mail');

obfuscate('example@example.com');
// => exa******@***.com
```

## Options

- `asterisksLength` - default `6`
- `minimumNameObfuscationLength` - default `4`
- `visibleCharactersStartLength` - default `3`
- `visibleCharactersMiddleLength` - default `2`
- `visibleCharactersEndLength` - default `2`
- `showDomainName` - default `false`
- `showDomainExtension` - default `true`
- `invalidEmailValue` - default `*********@****.**`

## Examples

```js
const result = obfuscate('example@example.com');
expect(result).equal('exa******@***.com');
```

```js
const result = obfuscate('example.example@example.com');
expect(result).equal('exa***le***le@***.com');
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
expect(result).equal('co****an****ame@*****.com');
```

```js
const result = obfuscate('company.name@test.com', {
  visibleCharactersStartLength: 4,
  visibleCharactersEndLength: 1,
  minimumNameObfuscationLength: 6,
});
expect(result).equal('comp***n***e@***.com');
```

```js
const result = obfuscate('company.name@test.com', {
  visibleCharactersStartLength: 3,
  visibleCharactersEndLength: 2,
  minimumNameObfuscationLength: 6,
});
expect(result).equal('com***a***me@***.com');
```

```js
const result = obfuscate('company.name@test.com', {
  visibleCharactersStartLength: 2,
  visibleCharactersMiddleLength: 3,
  visibleCharactersEndLength: 2,
  minimumNameObfuscationLength: 6,
});
expect(result).equal('co***an***me@***.com');
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
expect(result).equal('***mp***name@***.com');
```

```js
const result = obfuscate('email.without@domain-extension');
expect(result).equal('ema***.w***ut@***.***');
```

```js
const result = obfuscate(undefined);
expect(result).equal('*********@****.**');
```

```js
const result = obfuscate('');
expect(result).equal('*********@****.**');
```

```js
const result = obfuscate(1234);
expect(result).equal('*********@****.**');
```

```js
const result = obfuscate('invalid email');
expect(result).equal('*********@****.**');
```

```js
const result = obfuscate('invalid@email@email.com');
expect(result).equal('*********@****.**');
```

```js
const result = obfuscate(null, { invalidEmailValue: 'invalid email' });
expect(result).equal('invalid email');
```
