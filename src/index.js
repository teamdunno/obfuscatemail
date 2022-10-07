const { getOptions, DEFAULT_OPTIONS } = require('./utils');

const obfuscateEmail = (email, options = DEFAULT_OPTIONS) => {
  const opts = getOptions(options);

  if (typeof email !== 'string' || email.length === 0 || !email.includes('@')) {
    return `${'*'.repeat(opts.asterisksLength)}@${'*'.repeat(
      opts.asterisksLength,
    )}`;
  }

  const [name, domain] = email.split('@');
  const [domainName, domainExtension = '***'] = domain.split('.');

  const visibleCharactersStartLength =
    name.length > 1
      ? Math.min(
          name.length - opts.minimumNameObfuscationLength > 0
            ? name.length - opts.minimumNameObfuscationLength
            : 0,
          opts.visibleCharactersStartLength,
        )
      : 0;

  const visibleCharactersEndLength =
    name.length >
    visibleCharactersStartLength + opts.minimumNameObfuscationLength
      ? Math.min(
          name.length -
            visibleCharactersStartLength -
            opts.minimumNameObfuscationLength,
          opts.visibleCharactersEndLength,
        )
      : 0;

  return `${name.substring(0, visibleCharactersStartLength)}${'*'.repeat(
    opts.asterisksLength,
  )}${
    visibleCharactersEndLength > 0
      ? name.substring(name.length - visibleCharactersEndLength)
      : ''
  }@${
    opts.showDomainName
      ? domainName
      : '*'.repeat(Math.max(3, opts.asterisksLength - 3))
  }.${opts.showDomainExtension ? domainExtension : '***'}`;
};

module.exports = obfuscateEmail;
