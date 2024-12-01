/** Obfuscate-mail option */
export interface Options {
    /** Specify how long the asterisks `*` length would be */
    asterisksLength: number,
    /** Set the minimum obfuscated mail length */
    minimumLength: number,
    /** Visible Characters options */
    visibleCharacters:{
        /** Expand the visible characters. On the first part */
        startLength: number,
        /** Expand the visible characters. On the middle part */
        middleLength: number,
        /** Expand the visible characters. On the last part */
        endLength: number
    }
    /** Show domain name? (those `*@example.*`) */
    showDomainName: boolean,
    /** Show domain extension? (those `*@*.com`) */
    showDomainExtension: boolean,
    /** The fallback if the provided email isnt valid */
    invalidEmailValue: string
}
/** Undefined value */
export type Undef = null|undefined
function undef<T>(value:T):T is undefined|null{
return typeof value === "undefined" || value === null
}
/** Make every objects Null-ish */
export type Nullish<T> = {[K in keyof T]+?:T[K] extends object?(T[K]|null):Nullish<T[K]>}|Undef
function getOptionsProto<T extends object>(options:Nullish<T>, def:T, fromDes?:string): T {
  let res:{[key:string]:(T[keyof T])}=def
  if (!options||Object.keys(options).length<1) {
    return res
  }
  for (const [_k, v] of Object.entries(options!)) {
      // typescript dosent resolve types on RT, only CT
      if (undef(v)){
         continue
      }
      if (typeof res[_k]!==typeof v || (res[_k] instanceof Array) !== (v instanceof Array)) {
        throw new TypeError(`Object ${fromDes?`${fromDes}.`:""}${_k} type needs to be same as Options.${fromDes?`${fromDes}.`:""}${_k}`)
      }
      const k = _k as keyof T
      if (typeof v==="object" && !(v instanceof Array)){
        res[k] = getOptionsProto<T[k] extends object?T[k]:object>(v, res[k], fromDes?`${fromDes}.${k}`:k)
      } else {
        res[k] = v
      }
  }
    return res as T
};
/**
 * @param {Options} options
 * @returns {Options}
 */
export function getOptions(options:Nullish<Options>):Options{
    return getOptionsProto<Options>(options, DEFAULT_OPTIONS)
}
export const DEFAULT_OPTIONS:Options = {
    asterisksLength: 6,
    minimumLength: 4,
    visibleCharacters: {
        startLength:3,
        middleLength: 2,
        endLength: 2
    },
    showDomainName: false,
    showDomainExtension: true,
    invalidEmailValue: '*********@****.**'
}
