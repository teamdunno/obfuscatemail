const { expect } = require('chai');
const { describe, it } = require('mocha');
const obfuscate = require('../src');

describe('Obfuscate Email', () => {
  it(`obfuscate('example@example.com') should return "exa******@***.com"`, () => {
    const result = obfuscate('example@example.com');

    expect(result).equal('exa******@***.com');
  });
  it(`obfuscate('example.example@example.com') should return "exa******le@***.com"`, () => {
    const result = obfuscate('example.example@example.com');

    expect(result).equal('exa******le@***.com');
  });

  it(`obfuscate('e@example.com') should return "******@***.com"`, () => {
    const result = obfuscate('e@example.com');

    expect(result).equal('******@***.com');
  });
  it(`obfuscate('exa@example.com') should return "******@***.com"`, () => {
    const result = obfuscate('exa@example.com');

    expect(result).equal('******@***.com');
  });
  it(`obfuscate('examp@example.com') should return "e******@***.com"`, () => {
    const result = obfuscate('examp@example.com');

    expect(result).equal('e******@***.com');
  });
  it(`obfuscate('example@example.com') with showDomainName: true should return "exa******@example.com"`, () => {
    const result = obfuscate('example@example.com', {
      showDomainName: true,
    });

    expect(result).equal('exa******@example.com');
  });
  it(`obfuscate('example@example.com') with showDomainName: true and showDomainExtension: false should return "exa******@example.***"`, () => {
    const result = obfuscate('example@example.com', {
      showDomainName: true,
      showDomainExtension: false,
    });

    expect(result).equal('exa******@example.***');
  });
  it(`obfuscate('company.name@test.com') with options asterisksLength: 8, visibleCharactersStartLength: 2, visibleCharactersEndLength: 3, showDomainName: false, should return "co********ame@*****.com"`, () => {
    const result = obfuscate('company.name@test.com', {
      asterisksLength: 8,
      visibleCharactersStartLength: 2,
      visibleCharactersEndLength: 3,
      showDomainName: false,
    });

    expect(result).equal('co********ame@*****.com');
  });
  it(`obfuscate('company.name@test.com') with options visibleCharactersStartLength: 4, visibleCharactersEndLength: 1, minimumNameObfuscationLength: 6 should return "comp******e@***.com"`, () => {
    const result = obfuscate('company.name@test.com', {
      visibleCharactersStartLength: 4,
      visibleCharactersEndLength: 1,
      minimumNameObfuscationLength: 6,
    });

    expect(result).equal('comp******e@***.com');
  });
  it(`obfuscate('company.name@test.com') with options visibleCharactersStartLength: 3, visibleCharactersEndLength: 2, minimumNameObfuscationLength: 6 should return "com******me@***.com"`, () => {
    const result = obfuscate('company.name@test.com', {
      visibleCharactersStartLength: 3,
      visibleCharactersEndLength: 2,
      minimumNameObfuscationLength: 6,
    });

    expect(result).equal('com******me@***.com');
  });

  it(`obfuscate('company.name@test.com') with options visibleCharactersStartLength: 3, visibleCharactersEndLength: 2, minimumNameObfuscationLength: 10 should return "com******@***.com"`, () => {
    const result = obfuscate('company.name@test.com', {
      visibleCharactersStartLength: 3,
      visibleCharactersEndLength: 2,
      minimumNameObfuscationLength: 10,
    });

    expect(result).equal('co******@***.com');
  });
  it(`obfuscate('company.name@test.com') with options visibleCharactersStartLength: 0, visibleCharactersEndLength: 4 should return "******name@***.com"`, () => {
    const result = obfuscate('company.name@test.com', {
      visibleCharactersStartLength: 0,
      visibleCharactersEndLength: 4,
    });

    expect(result).equal('******name@***.com');
  });
  it(`obfuscate(undefined) should return "******@******"`, () => {
    const result = obfuscate(undefined);

    expect(result).equal('******@******');
  });
  it(`obfuscate('') should return "******@******"`, () => {
    const result = obfuscate('');

    expect(result).equal('******@******');
  });
  it(`obfuscate(1234) should return "******@******"`, () => {
    const result = obfuscate(1234);

    expect(result).equal('******@******');
  });
  it(`obfuscate('random string') should return "******@******"`, () => {
    const result = obfuscate('random string');

    expect(result).equal('******@******');
  });
});
