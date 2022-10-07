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

module.exports.getOptions = (options) => {
  return Object.keys(DEFAULT_OPTIONS).reduce((acc, key) => {
    acc[key] = checkOptionValue(key, options[key]);
    return acc;
  }, {});
};

module.exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
