<img width="441" alt="image" src="https://github.com/user-attachments/assets/708de802-6cb8-4422-a548-84d707e2f66b">

> the Artwork was made by [vintheweirdass](https://github.com/vintheweirdass)

:warning: STILL IN ALPHA, NOT READY FOR ANY USE

Note: this is a friendlier option for Node.js users and other runtimes (Bun, Deno, and others) that wants to use ESM instead of Commonjs. It also supports types too!
<details>
<summary>Why we made this package?</summary>
  
Even though the original package ([npm:obfuscate-mail](https://www.npmjs.com/package/obfuscate-mail)) provides the types, but the package explicitly exporting to the plain, javascript bundle version. That makes the types gone
<details>
<summary>Screenshot</summary>
  
<img width="441" alt="image" src="https://github.com/user-attachments/assets/e7d5874a-6a53-4f9a-8707-1a742ebb3104">

</details>
</details>
To install, you need to use JSR so it passes to the compile/transpille <sup>whatever it is</sup> process automatically

## Installation for Nodejs
For npm
```shell
$ npx jsr add @dunno/obfuscatemail
```
For Yarn
> Note: You need to upgrade to v4+, because when installing Yarn, the distribution for Linux only sticks to v1 (thats why the `dlx` command dosent found)
>
> ```shell
> $ yarn upgrade
> ```
```shell
$ yarn dlx jsr add @dunno/obfuscatemail
```
For pnpm
```shell
$ pnpm dlx jsr add @dunno/obfuscatemail
```
## Installation for non-Nodejs
For Bun
```
$ bunx jsr add @dunno/obfuscatemail
```
For Deno
```
$ deno add jsr:@dunno/obfuscatemail
```

# obfuscate mail

Email addresses should never been displayed by an api unless specifically requested by a recently authentified user.

This library gives the options to obfuscate email addresses will leaving them more or less identifiable.

```js
import { obfuscateMail } from '@dunno/obfuscatemail';
```

```js
obfuscateMail('example.example@example.com', {
  // asterisksLength: 6,
  // minimumNameObfuscationLength: 4,
  // visibleCharacters:{
  //    startLength: 3,
  //    middleLength: 2,
  //    endLength:2,
  // }
  // showDomainName: false,
  // showDomainExtension: true,
  // invalidEmailValue: '*********@****.**',
});
```

> `=> exa***.e***le@***.com`
---
<details open>
<summary>(click me to hide the `Migration` section)</summary>

## Migration 
This page is only for those who use the [npm:obfuscate-mail](https://www.npmjs.com/package/obfuscate-mail) package. For newcomer, its fine 😉

After those imports, you need some changed to your files also

For Options,

- `minimumNameObfuscationLength` was moved to `minimumLength`
- Variables that starts with `visibleCharacters` are going to be inside the object itself, as follows:
```js
/* from these */
{
  visibleCharactersStartLength:number,
  visibleCharactersMiddleLength:number,
  visibleCharactersEndLength:number
}
/* to these */
{
  visibleCharacters:{
    startLength:number,
    middleLength:number,
    endLength:number
  }
}
```
Also, wasm (for this package) was deprecated for some reason. So theres no separate preloader `wasm.js` or the wasm itself `bundle.wasm`
</details>

## Options

- `asterisksLength` - default `6`
- `minimumLength` - default `4`
- `visibleCharacters` : {
  - `startLength` - default `3`
  - `middleLength` - default `2`
  - `endLength` - default `2`
- }
- `showDomainName` - default `false`
- `showDomainExtension` - default `true`
- `invalidEmailValue` - default `*********@****.**`
- 
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
const result = obfuscateMail('example@example.com');
expect(result).equal('exa******@***.com');
```

```js
const result = obfuscateMail('example.example@example.com');
expect(result).equal('exa***.e***le@***.com');
```

```js
const result = obfuscateMail('e@example.com');
expect(result).equal('******@***.com');
```

```js
const result = obfuscateMail('exa@example.com');
expect(result).equal('******@***.com');
```

```js
const result = obfuscateMail('examp@example.com');
expect(result).equal('e******@***.com');
```

```js
const result = obfuscateMail('example@example.com', {
  showDomainName: true,
});
```

```js
const result = obfuscateMail('email.without@domain-extension');
expect(result).equal('ema***wi***ut@***.***');
```
```js
const result = obfuscateMail('invalid email');
expect(result).equal('*********@****.**');
```

```js
const result = obfuscateMail(null, { invalidEmailValue: 'invalid email' });
expect(result).equal('invalid email');
```
