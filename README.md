:warning: STILL IN ALPHA, NOT READY FOR ANY USE

Note: this is a friendlier option for Node.js users and other runtimes (Bun, Deno, and others) that wants to use ESM instead of Commonjs. It also supports types too!

Even though the original package provides the types, but the package explicitly exporting to the plain, javascript bundle version. That makes the types gone
<details>
<summary>Screenshot</summary>
  
<img width="441" alt="image" src="https://github.com/user-attachments/assets/e7d5874a-6a53-4f9a-8707-1a742ebb3104">

</details>

To install, you need to use JSR so it passes to the compile/transpille <sup>whatever it is</sup> process automatically

## Installation for Nodejs
For npm
```shell
$ npx jsr add @teamdunno/obfuscatemail
```
For Yarn
> Note: You need to upgrade to v4+, because when installing Yarn, the distribution for Linux only sticks to v1 (thats why the `dlx` command dosent found)
>
> ```shell
> $ yarn upgrade
> ```
```shell
$ yarn dlx jsr add @teamdunno/obfuscatemail
```
For pnpm
```shell
$ pnpm dlx jsr add @teamdunno/obfuscatemail
```
## Installation for non-Nodejs
For Bun
```
$ bunx jsr add @teamdunno/obfuscatemail
```
For Deno
```
$ deno add jsr:@teamdunno/obfuscatemail
```

# obfuscate mail

Email addresses should never been displayed by an api unless specifically requested by a recently authentified user.

This library gives the options to obfuscate email addresses will leaving them more or less identifiable.

```js
import obfuscate from '@dunno/obfuscatemail';
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

## [Test it with runKit](https://runkit.com/rawpixel-vincent/obfuscate-email)

## Web assembly binary (WASI-compatible)

```sh
curl -o obfuscate.wasm https://raw.githubusercontent.com/rawpixel-vincent/obfuscatemail/main/dist/bundle.wasm
```

```sh
echo '{ "email": "example.example@example.com", "options": {} }' | wasmtime obfuscate.wasm
```

> `=> "exa***.e***le@***.com"%`

## Examples
### Setup
You may need to install `jsr:@std/expect`. Install & import like the first setup, or open the detailed version at the bottom of the text
<details>

#### Installation for Nodejs
For npm
```shell
$ npx jsr add @std/expect
```
For Yarn
> Note: You need to upgrade to v4+, because when installing Yarn, the distribution for Linux only sticks to v1 (thats why the `dlx` command dosent found)
>
> ```shell
> $ yarn upgrade
> ```
```shell
$ yarn dlx jsr add @std/expect
```
For pnpm
```shell
$ pnpm dlx jsr add @std/expect
```
#### Installation for non-Nodejs
For Bun
```
$ bunx jsr add @std/expect
```
For Deno
```
$ deno add jsr:@std/expect
```
#### Usage (for any runtime)
```js
import { expect } from "@std/expect"
```
</details>
Heres the examples

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
