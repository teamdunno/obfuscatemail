const { expect } = require('chai');
const { describe, it } = require('mocha');
const obfuscate = require('../src');
const { DEFAULT_OPTIONS } = require('../src/utils');

const getObfuscatedCharactersCount = (clearEmail, obfuscatedEmail) => {
  const visibleCharactersLength = obfuscatedEmail
    .split('@')[0]
    .split('')
    .filter((c) => c !== '*').length;
  return clearEmail.split('@')[0].length - visibleCharactersLength;
};

describe('Obfuscate Email', () => {
  it(`obfuscate('example@example.com') should return "exa******@***.com"`, () => {
    const result = obfuscate('example@example.com');

    expect(result).equal('exa******@***.com');
    expect(
      getObfuscatedCharactersCount('example@example.com', result),
    ).greaterThanOrEqual(DEFAULT_OPTIONS.minimumNameObfuscationLength);
  });
  it(`obfuscate('example.example@example.com') should return "exa***e.***le@***.com"`, () => {
    const result = obfuscate('example.example@example.com');

    expect(result).equal('exa***e.***le@***.com');
    expect(
      getObfuscatedCharactersCount('example.example@example.com', result),
    ).greaterThanOrEqual(DEFAULT_OPTIONS.minimumNameObfuscationLength);
  });

  it(`obfuscate('e@example.com') should return "******@***.com"`, () => {
    const result = obfuscate('e@example.com');

    expect(result).equal('******@***.com');
    expect(
      getObfuscatedCharactersCount('e@example.com', result),
    ).greaterThanOrEqual(1);
  });
  it(`obfuscate('exa@example.com') should return "******@***.com"`, () => {
    const result = obfuscate('exa@example.com');

    expect(result).equal('******@***.com');
    expect(
      getObfuscatedCharactersCount('exa@example.com', result),
    ).greaterThanOrEqual(3);
  });
  it(`obfuscate('examp@example.com') should return "e******@***.com"`, () => {
    const result = obfuscate('examp@example.com');

    expect(result).equal('e******@***.com');
    expect(
      getObfuscatedCharactersCount('examp@example.com', result),
    ).greaterThanOrEqual(DEFAULT_OPTIONS.minimumNameObfuscationLength);
  });
  it(`obfuscate('example@example.com') with showDomainName: true should return "exa******@example.com"`, () => {
    const result = obfuscate('example@example.com', {
      showDomainName: true,
    });

    expect(result).equal('exa******@example.com');
  });
  it(`obfuscate('example.company+test@example.com') with showDomainName: true should return "exa******om******st@*********.com"`, () => {
    const result = obfuscate('example.company+test@example.com', {
      asterisksLength: 12,
    });

    expect(result).equal('exa******om******st@*********.com');
    expect(
      getObfuscatedCharactersCount('example.company+test@example.com', result),
    ).greaterThanOrEqual(DEFAULT_OPTIONS.minimumNameObfuscationLength);
  });
  it(`obfuscate('example@example.com') with showDomainName: true and showDomainExtension: false should return "exa******@example.***"`, () => {
    const result = obfuscate('example@example.com', {
      showDomainName: true,
      showDomainExtension: false,
    });

    expect(result).equal('exa******@example.***');
    expect(
      getObfuscatedCharactersCount('example@example.com', result),
    ).greaterThanOrEqual(DEFAULT_OPTIONS.minimumNameObfuscationLength);
  });
  it(`obfuscate('company.name@test.com') with options asterisksLength: 8, visibleCharactersStartLength: 2, visibleCharactersEndLength: 3, showDomainName: false, should return "co****an****ame@*****.com"`, () => {
    const result = obfuscate('company.name@test.com', {
      asterisksLength: 8,
      visibleCharactersStartLength: 2,
      visibleCharactersEndLength: 3,
      showDomainName: false,
    });

    expect(result).equal('co****an****ame@*****.com');
    expect(
      getObfuscatedCharactersCount('company.name@test.com', result),
    ).greaterThanOrEqual(DEFAULT_OPTIONS.minimumNameObfuscationLength);
  });
  it(`obfuscate('company.name@test.com') with options visibleCharactersStartLength: 4, visibleCharactersEndLength: 1, minimumNameObfuscationLength: 6 should return "comp***y***e@***.com"`, () => {
    const result = obfuscate('company.name@test.com', {
      visibleCharactersStartLength: 4,
      visibleCharactersEndLength: 1,
      minimumNameObfuscationLength: 6,
    });

    expect(result).equal('comp***y***e@***.com');
    expect(
      getObfuscatedCharactersCount('company.name@test.com', result),
    ).greaterThanOrEqual(6);
  });
  it(`obfuscate('company.name@test.com') with options visibleCharactersStartLength: 3, visibleCharactersEndLength: 2, minimumNameObfuscationLength: 6 should return "com***n***me@***.com"`, () => {
    const result = obfuscate('company.name@test.com', {
      visibleCharactersStartLength: 3,
      visibleCharactersEndLength: 2,
      minimumNameObfuscationLength: 6,
    });

    expect(result).equal('com***n***me@***.com');
    expect(
      getObfuscatedCharactersCount('company.name@test.com', result),
    ).greaterThanOrEqual(6);
  });
  it(`obfuscate('company.example@test.com') with options visibleCharactersStartLength: 2, visibleCharactersMiddleLength: 3, visibleCharactersEndLength: 2, minimumNameObfuscationLength: 6 should return "co***ny.***le@***.com"`, () => {
    const result = obfuscate('company.example@test.com', {
      visibleCharactersStartLength: 2,
      visibleCharactersMiddleLength: 3,
      visibleCharactersEndLength: 2,
      minimumNameObfuscationLength: 6,
    });

    expect(result).equal('co***ny.***le@***.com');
    expect(
      getObfuscatedCharactersCount('company.example@test.com', result),
    ).greaterThanOrEqual(6);
  });
  it(`obfuscate('company.name@test.com') with options visibleCharactersStartLength: 3, visibleCharactersEndLength: 2, minimumNameObfuscationLength: 10 should return "com******@***.com"`, () => {
    const result = obfuscate('company.name@test.com', {
      visibleCharactersStartLength: 3,
      visibleCharactersEndLength: 2,
      minimumNameObfuscationLength: 10,
    });

    expect(result).equal('co******@***.com');
    expect(
      getObfuscatedCharactersCount('company.name@test.com', result),
    ).greaterThanOrEqual(10);
  });
  it(`obfuscate('company.name@test.com') with options visibleCharactersStartLength: 0, visibleCharactersEndLength: 4 should return "***pa***name@***.com"`, () => {
    const result = obfuscate('company.name@test.com', {
      visibleCharactersStartLength: 0,
      visibleCharactersEndLength: 4,
    });

    expect(result).equal('***pa***name@***.com');
    expect(
      getObfuscatedCharactersCount('company.name@test.com', result),
    ).greaterThanOrEqual(DEFAULT_OPTIONS.minimumNameObfuscationLength);
  });
  it(`obfuscate(undefined) should return "*********@****.**"`, () => {
    const result = obfuscate(undefined);

    expect(result).equal('*********@****.**');
  });
  it(`obfuscate('') should return "*********@****.**"`, () => {
    const result = obfuscate('');

    expect(result).equal('*********@****.**');
  });
  it(`obfuscate(1234) should return "*********@****.**"`, () => {
    const result = obfuscate(1234);

    expect(result).equal('*********@****.**');
  });
  it(`obfuscate('invalid email') should return "*********@****.**"`, () => {
    const result = obfuscate('invalid email');

    expect(result).equal('*********@****.**');
  });
  it(`obfuscate('invalid@email@email') should return "*********@****.**"`, () => {
    const result = obfuscate('invalid@email@email.com');

    expect(result).equal('*********@****.**');
  });
  it(`obfuscate(null) with options invalidEmailValue: 'invalid email' should return "invalid email"`, () => {
    const result = obfuscate(null, { invalidEmailValue: 'invalid email' });

    expect(result).equal('invalid email');
  });
  it(`obfuscate('email.without@domain-extension') should return "ema***.w***ut@***.***"`, () => {
    const result = obfuscate('email.without@domain-extension');

    expect(result).equal('ema***.w***ut@***.***');
    expect(
      getObfuscatedCharactersCount('email.without@domain-extension', result),
    ).greaterThanOrEqual(DEFAULT_OPTIONS.minimumNameObfuscationLength);
  });
  it(`Unknown options should not throw`, () => {
    let error = null;
    try {
      obfuscate('', { badOption: 1 });
    } catch (e) {
      error = e;
    }
    expect(error).to.be.null;
  });
  it(`Invalid options should throw`, () => {
    try {
      obfuscate('', { minimumNameObfuscationLength: 'string' });
    } catch (error) {
      expect(error.message).equal(
        'Option minimumNameObfuscationLength must be of type number',
      );
    }
  });
  it(`obfuscate('abcdefgh.ijklmno@domain.com') with options visibleCharactersStartLength: 4, visibleCharactersMiddleLength: 4, visibleCharactersEndLength: 4 should return "abcd***fgh.***lmno@***.com"`, () => {
    const result = obfuscate('abcdefgh.ijklmno@domain.com', {
      visibleCharactersStartLength: 4,
      visibleCharactersMiddleLength: 4,
      visibleCharactersEndLength: 4,
    });

    expect(result).equal('abcd***fgh.***lmno@***.com');
    expect(
      getObfuscatedCharactersCount('abcdefgh.ijklmno@domain.com', result),
    ).greaterThanOrEqual(DEFAULT_OPTIONS.minimumNameObfuscationLength);
  });
});
