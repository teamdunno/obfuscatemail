var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// utils.js
var require_utils = __commonJS({
  "utils.js"(exports, module2) {
    var DEFAULT_OPTIONS = {
      asterisksLength: 6,
      minimumNameObfuscationLength: 4,
      visibleCharactersStartLength: 3,
      visibleCharactersMiddleLength: 2,
      visibleCharactersEndLength: 2,
      showDomainName: false,
      showDomainExtension: true,
      invalidEmailValue: "*********@****.**"
    };
    function checkOptionValue(key, value) {
      if (value === void 0) {
        return DEFAULT_OPTIONS[key];
      }
      if (typeof DEFAULT_OPTIONS[key] !== typeof value) {
        throw new Error(
          `Option ${key} must be of type ${typeof DEFAULT_OPTIONS[key]}`
        );
      }
      return value;
    }
    module2.exports.getOptions = (options) => {
      return Object.keys(DEFAULT_OPTIONS).reduce((acc, key) => {
        acc[key] = checkOptionValue(key, options[key]);
        return acc;
      }, {});
    };
    module2.exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
  }
});

// obfuscateEmail.js
var require_obfuscateEmail = __commonJS({
  "obfuscateEmail.js"(exports, module2) {
    var { getOptions, DEFAULT_OPTIONS } = require_utils();
    var obfuscateEmail = (email, options = DEFAULT_OPTIONS) => {
      const opts = getOptions(options);
      if (typeof email !== "string" || email.length === 0 || !email.includes("@") || email.split("@").length !== 2) {
        return opts.invalidEmailValue;
      }
      const [name, domain] = email.split("@");
      const [domainName, domainExtension = "***"] = domain.split(".");
      const visibleCharactersStartLength = opts.visibleCharactersStartLength > 0 && name.length > 1 ? Math.min(
        name.length - opts.minimumNameObfuscationLength > 0 ? name.length - opts.minimumNameObfuscationLength : 0,
        opts.visibleCharactersStartLength
      ) : 0;
      const visibleCharactersEndLength = opts.visibleCharactersEndLength > 0 && name.length > visibleCharactersStartLength + opts.minimumNameObfuscationLength ? Math.min(
        name.length - visibleCharactersStartLength - opts.minimumNameObfuscationLength,
        opts.visibleCharactersEndLength
      ) : 0;
      const visibleCharactersMiddleLength = opts.visibleCharactersMiddleLength > 0 && name.length - visibleCharactersStartLength - visibleCharactersEndLength - opts.minimumNameObfuscationLength > 0 ? Math.min(
        name.length - visibleCharactersStartLength - visibleCharactersEndLength - opts.minimumNameObfuscationLength,
        opts.visibleCharactersMiddleLength
      ) : 0;
      const charactersLeftToObfuscate = Math.max(
        0,
        name.length - visibleCharactersStartLength - visibleCharactersEndLength
      );
      const middleCharacters = visibleCharactersMiddleLength > 0 ? name.substring(visibleCharactersStartLength).substring(
        Math.round(
          charactersLeftToObfuscate / 2 - visibleCharactersMiddleLength / 2
        )
      ).substring(0, visibleCharactersMiddleLength) : "";
      return `${name.substring(0, visibleCharactersStartLength)}${"*".repeat(
        Math.max(1, Math.floor(opts.asterisksLength / 2))
      )}${middleCharacters}${"*".repeat(
        Math.max(1, Math.floor(opts.asterisksLength / 2))
      )}${visibleCharactersEndLength > 0 ? name.substring(name.length - visibleCharactersEndLength) : ""}@${opts.showDomainName ? domainName : "*".repeat(Math.max(3, opts.asterisksLength - 3))}.${opts.showDomainExtension ? domainExtension : "***"}`;
    };
    module2.exports = obfuscateEmail;
    module2.exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
  }
});

// wasm.js
var obfuscate = require_obfuscateEmail();
function main(input) {
  return obfuscate(input.email, input.options);
}
Shopify = {
  main
};
