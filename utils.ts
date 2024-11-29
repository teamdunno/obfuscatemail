/** Obfuscate-mail option */
export interface Options {
    /** Specify how long the asterisks `*` length would be */
    asterisksLength: number,
    /** Set the minimum obfuscated mail length */
    minimumNameObfuscationLength: number,
    /** Expand the visible characters. On the first part */
    visibleCharactersStartLength: number,
    /** Expand the visible characters. On the middle part */
    visibleCharactersMiddleLength: number,
    /** Expand the visible characters. On the last part */
    visibleCharactersEndLength: number,
    /** Show domain name? (those `*@example.*`) */
    showDomainName: boolean,
    /** Show domain name? (those `*@*.com`) */
    showDomainExtension: boolean,
    /** The fallback if the provided email isnt valid */
    invalidEmailValue: string
}
/** Undefined value */
export type Undef = null|undefined
/** Make every objects Null-ish */
export type Nullish<T> = {[K in keyof T]+?:T[K]|null}|Undef
function checkOptionValue(key:keyof Options, value:Options[keyof Options]|null|undefined):Options[keyof Options] {
  if (value === undefined || value === null) {
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
export function getOptions(options:Nullish<Options>): Options {
  // fast iterator here we gooo
  let res:Options=DEFAULT_OPTIONS
  if (!options) {
    return DEFAULT_OPTIONS
  };
  const keys = Object.keys(options)
  if (keys.length<1) {
    return DEFAULT_OPTIONS
  }
  for (const [_k] of Object.entries(DEFAULT_OPTIONS)) {
    const k = _k as keyof Options
    if (!options) {return DEFAULT_OPTIONS}
    if (typeof options[k] === "undefined" || options[k])
    res[k] = checkOptionValue(k, options[k])
  }
};
export const DEFAULT_OPTIONS:Options = {
    asterisksLength: 6,
    minimumNameObfuscationLength: 4,
    visibleCharactersStartLength: 3,
    visibleCharactersMiddleLength: 2,
    visibleCharactersEndLength: 2,
    showDomainName: false,
    showDomainExtension: true,
    invalidEmailValue: '*********@****.**'
}
