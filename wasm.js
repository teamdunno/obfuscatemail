const obfuscate = require('./obfuscateEmail');

function main(input) {
  return obfuscate(input.email, input.options);
}

Shopify = {
  main: main,
};
