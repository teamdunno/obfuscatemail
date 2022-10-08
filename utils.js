/**
 * @typedef {Object} Options
 * @property {number} [asterisksLength=6]
 * @property {number} [minimumNameObfuscationLength=4]
 * @property {number} [visibleCharactersStartLength=3]
 * @property {number} [visibleCharactersMiddleLength=2]
 * @property {number} [visibleCharactersEndLength=2]
 * @property {boolean} [showDomainName=false]
 * @property {boolean} [showDomainExtension=true]
 * @property {string} [invalidEmailValue="*********@****.**"]
 */

/**
 * @typedef {[keyof Options]} OptionsKeys

/**
 * @type {Options}
 */
const DEFAULT_OPTIONS = {
  asterisksLength: 6,
  minimumNameObfuscationLength: 4,
  visibleCharactersStartLength: 3,
  visibleCharactersMiddleLength: 2,
  visibleCharactersEndLength: 2,
  showDomainName: false,
  showDomainExtension: true,
  invalidEmailValue: '*********@****.**',
};

/**
 * @param {string} key
 * @param {any} value
 * @returns {Options}
 * @throws {Error}
 */
function checkOptionValue(key, value) {
  if (value === undefined) {
    return DEFAULT_OPTIONS[key];
  }
  if (typeof DEFAULT_OPTIONS[key] !== typeof value) {
    throw new Error(
      `Option ${key} must be of type ${typeof DEFAULT_OPTIONS[key]}`,
    );
  }
  return value;
}

/**
 * @param {Options} options
 * @returns {Options}
 */
module.exports.getOptions = (options) => {
  return Object.keys(DEFAULT_OPTIONS).reduce((acc, key) => {
    acc[key] = checkOptionValue(key, options[key]);
    return acc;
  }, {});
};

module.exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
