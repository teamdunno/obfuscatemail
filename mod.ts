// export * from "./utils.ts"
import {
  DEFAULT_OPTIONS,
  getOptions,
  type Nullish,
  type Options,
} from './utils.ts';
export type { Options };
export { DEFAULT_OPTIONS };
/**
 * Obfuscate an email.
 * @returns {string}
 * @throws {Error} if an option type is invalid.
 */
export function obfuscateEmail(
  email: string,
  options?: Nullish<Options>,
): string {
  const opts = getOptions(options);
  if (
    typeof email !== 'string' ||
    email.length === 0 ||
    !email.includes('@') ||
    email.split('@').length !== 2
  ) {
    return opts.invalidEmailValue;
  }

  const [name, domain] = email.split('@');
  const [domainName, domainExtension = '***'] = domain.split('.');

  const visibleCharactersStartLength =
    opts.visibleCharacters.startLength > 0 && name.length > 1
      ? Math.min(
        name.length - opts.minimumLength > 0
          ? name.length - opts.minimumLength
          : 0,
        opts.visibleCharacters.startLength,
      )
      : 0;

  const visibleCharactersEndLength = opts.visibleCharacters.endLength > 0 &&
      name.length >
        visibleCharactersStartLength + opts.minimumLength
    ? Math.min(
      name.length -
        visibleCharactersStartLength -
        opts.minimumLength,
      opts.visibleCharacters.endLength,
    )
    : 0;

  const visibleCharactersMiddleLength =
    opts.visibleCharacters.middleLength > 0 &&
      name.length -
            visibleCharactersStartLength -
            visibleCharactersEndLength -
            opts.minimumLength >
        0
      ? Math.min(
        name.length -
          visibleCharactersStartLength -
          visibleCharactersEndLength -
          opts.minimumLength,
        opts.visibleCharacters.middleLength,
      )
      : 0;

  const charactersLeftToObfuscate = Math.max(
    0,
    name.length - visibleCharactersStartLength - visibleCharactersEndLength,
  );

  const middleCharacters = visibleCharactersMiddleLength > 0
    ? name
      .substring(visibleCharactersStartLength)
      .substring(
        Math.round(
          charactersLeftToObfuscate / 2 - visibleCharactersMiddleLength / 2,
        ),
      )
      .substring(0, visibleCharactersMiddleLength)
    : '';

  return `${name.substring(0, visibleCharactersStartLength)}${
    '*'.repeat(
      Math.max(1, Math.floor(opts.asterisksLength / 2)),
    )
  }${middleCharacters}${
    '*'.repeat(
      Math.max(1, Math.floor(opts.asterisksLength / 2)),
    )
  }${
    visibleCharactersEndLength > 0
      ? name.substring(name.length - visibleCharactersEndLength)
      : ''
  }@${
    opts.showDomainName
      ? domainName
      : '*'.repeat(Math.max(3, opts.asterisksLength - 3))
  }.${opts.showDomainExtension ? domainExtension : '***'}`;
}

export default obfuscateEmail;

