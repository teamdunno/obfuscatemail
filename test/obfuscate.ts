import { assertEquals, assert } from "jsr:@std/assert";
import {Nullish, Options} from "../utils.ts"
import obfuscate from "./mod.ts"
// Deno has ended support for 'assert' keyword (not @std/assert), so just do this
import fakeEmailData from "./data/email_data.json" with {type:"json"}
const getObfuscatedCharactersCount = (clearEmail, obfuscatedEmail) => {
  const visibleCharactersLength = obfuscatedEmail
    .split('@')[0]
    .split('')
    .filter((c) => c !== '*').length;
  return clearEmail.split('@')[0].length - visibleCharactersLength;
};
// to fix so many test objects, we're gonna make it short instead 
  function testFormat(email:string, shouldBe:string, options?:Nullish<Options>){
    Deno.test(`obfuscate('${email}')${(options||Object.keys(options).length>0)?` with option${Object.keys(options).length>1?`s ${JSON.stringify(options)}`:` ${Object.keys(options)[0]}:${Object.values(options)[0]}`}`:""} should return "${shouldBe}"`, () => {
      const result = obfuscate(email, options);
      assertEqual(result, shouldBe)
      assert(getObfuscatedCharactersCount(email, result)>=DEFAULT_OPTIONS.minimumLength, `Obfuscated characters count dosent equal or greater than default, minimun obfuscation length`)
    });
  }
type TestPack = ({[key:string]:{
  name:string,
  shouldBe:string,
  options?:Nullish<Options>
}})[]
const simpleTest:TestPack = {
  {
    name:"example@example.com",
    shouldBe:"exa******@***.com"
  },
  {
    name:"example.example@example.com",
    shouldBe:"exa***.e***le@***.com"
  },
  {
    name:"e@example.com",
    shoukdBe:"******@***.com"
  },
  {
    name:"exa@example.com",
    shouldBe:"******@***.com"
  },
  {
    name:"examp@example.com",
    shouldBe:"e******@***.com"
  },
  //for this, ik it sounds weird
  {
    name:"email.without@domain-extension",
    shouldBe:"ema***wi***ut@***.***"
  }
}
const testWithOptions:TestPack = [
  {
    name:"example@example.com",
    shouldBe:"exa******@example.com",
    options:{
      showDomainName:true
    }
  },
  {
    name:"example@example.com",
    shouldBe:"exa******mp******st@*********.com",
    options:{
      asteriksLength:12
    }
  },
  {
    name:"example@example.com",
    shouldBe:"exa******@example.***",
    options:{
     showDomainName: true,
     showDomainExtension: false
    }
  }
]
const testWithOptionsAdv:TestPack=[
  {
    name:"company.name@test.com",
    shouldBe:"co****ny****ame@*****.com",
    options:{
     asterisksLength: 8,
     visibleCharacters:{
       startLength: 2,
       endLength: 3,
     },
      minimumLength: 6,
      showDomainName: false
    }
  },
  {
    name:"company.name@test.com",
    shouldBe:"comp***.***e@***.com",
    options:{
     asterisksLength: 8,
     visibleCharacters:{
       startLength: 2,
       endLength: 3,
     },
     minimumLength: 6,
     showDomainName: false
    }
  },
  {
    name:"company.name@test.com",
    shouldBe:"com***y***me@***.com",
    visibleCharacters:{
      startLength: 3,
      endLength: 2,
    },
    minimumLength: 6
  },
  {
    name:"company.example@test.com",
    shouldBe:"co***y.e***le@***.com",
    options:{
      visibleCharacters:{
        startLength: 2,
        middleLength: 3,
        endLength: 2
      },
      minimumLength: 6
    }
  },
  {
    name:"company.name@test.com",
    shouldBe:"co******@***.com",
    visibleCharacters:{
      startLength: 3,
      endLength: 2
    },
    minimumLength: 10
  },
  {
    name:"company.name@test.com",
    shouldBe:"***pa***name@***.com",
    options:{
      visibleCharacters:{
        startLength: 0,
        endLength: 4
      }
    }
  },
  {
    name:"abcdefgh.ijklmno@domain.com",
    shouldBe:"abcd***gh.i***lmno@***.com",
    options:{
      visibleCharacters:{
        startLength: 4,
        middleLength: 4,
        endLength: 4,
      }
    }
  }
]
//ik its kinda random just to spread all of this
const testPack:TestPack = [
  ...simpleTest,
  ...testWithOptions,
  ...testWithOptionsAdv
]
//run the testpacks
for (let i=0;i++;i<testPack.length){
  const obj = testPack[i]
  testFormat(obj.name, obj.shouldBe, obj.options)
}
Deno.test(`obfuscate 1000 naugthy email without throwing`, async () => {
    fakeEmailData.forEach(({ email }) => {
      const result = obfuscate(email);
      assert(result.length>0, "Obfuscated string needs at least one or more length to continue")
      if (email) {
        assert(getObfuscatedCharactersCount(email)>=(
          email.split('@')[0].length <
            DEFAULT_OPTIONS.minimumLength
            ? email.split('@')[0].length
            : DEFAULT_OPTIONS.minimLength
        ));
        console.log(`${email}: ${result}`)
      }
    });
  });

/*
Its impossible to check these on TS.
TODO: Make it JS
  it(`Unknown options should not throw`, () => {
    let error = null;
    try {
      // @ts-ignore
      obfuscate('', { badOption: 1 });
    } catch (e) {
      error = e;
    }
    expect(error).to.be.null;
  });
  it(`Invalid options should throw`, () => {
    try {
      // @ts-ignore
      obfuscate('', { minimumNameObfuscationLength: 'string' });
    } catch (error) {
      expect(error.message).equal(
        'Option minimumNameObfuscationLength must be of type number',
      );
    }
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
    // @ts-ignore
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
  */
