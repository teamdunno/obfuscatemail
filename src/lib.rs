#![allow(non_snake_case)]
use serde_merge::omerge;
use serde::{Deserialize, Serialize};
use serde_wasm_bindgen::from_value;
use std::{cmp, num::TryFromIntError, str::Chars};
use substring::Substring;
use wasm_bindgen::{prelude::*, throw_str};
#[derive(Serialize, Deserialize, Clone)]
pub struct VisibleCharacters {
    pub startLength: i32,
    pub middleLength: i32,
    pub endLength: i32,
}
/** Visible Characters options */
#[derive(Serialize, Deserialize)]
pub struct NullishVisibleCharacters {
    /** Expand the visible characters. On the first part */
    pub startLength: Option<i32>,
    /** Expand the visible characters. On the middle part */
    pub middleLength: Option<i32>,
    /** Expand the visible characters. On the last part */
    pub endLength: Option<i32>,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Options {
    pub asterisksLength: i32,
    pub minimumLength: i32,
    pub visibleCharacters: VisibleCharacters,
    pub showDomainName: bool,
    pub showDomainExtension: bool,
    pub invalidEmailValue: String,
}
impl Options {
    fn default() -> Self {
        Self {
            asterisksLength: 6,
            minimumLength: 6,
            visibleCharacters: VisibleCharacters {
                startLength: 3,
                middleLength: 2,
                endLength: 2,
            },
            showDomainName: false,
            showDomainExtension: true,
            invalidEmailValue: "*********@****.**".to_owned(),
        }
    }
}
/** Options */
#[derive(Serialize, Deserialize)]
pub struct NullishOptions {
    /** Specify how long the asterisks `*` length would be */
    pub asterisksLength: Option<i32>,
    /** Set the minimum obfuscated mail length */
    pub minimumLength: Option<i32>,
    /** Visible Characters options */
    pub visibleCharacters: Option<NullishVisibleCharacters>,
    /** Show domain name? (those `*@example.*`) */
    pub showDomainName: Option<bool>,
    /** Show domain extension? (those `*@*.com`) */
    pub showDomainExtension: Option<bool>,
    /** The fallback if the 'a provided email isnt valid */
    pub invalidEmailValue: Option<String>,
}
/** Obfuscate mail */
#[wasm_bindgen]
pub fn obfuscateMail(email: String, options: JsValue) -> String {
    let optsRaw: NullishOptions = from_value::<NullishOptions>(options).unwrap_throw();
    let mergeProc: Result<Options, serde_merge::error::Error> = omerge::<NullishOptions, Options, Options>(optsRaw, Options::default());
    if mergeProc.is_err() {
        throw_str("Failed to merge options with the default configuration")
    }
    let opts: Options = mergeProc.unwrap();
    let mail: String = email.to_owned();
    // protec some weird characters. Since email only uses ascii
    if mail.len() < 1
        || !(mail.is_ascii())
        || !mail.contains('@')
        || mail.chars().filter(|c| *c == '@').count() != 1
    {
        return opts.invalidEmailValue;
    }
    // split @
    let address: Vec<&str> = email.split('@').collect();
    // if it more than 2, or 1, or even zero, return
    if address.len() != 2 {
        return opts.invalidEmailValue;
    }
    // tuple'd into name n domain
    let (name, domain) = (address[0], address[1]);
    // prevent dots on email name (NOT THE DOMAIN)
    if name.chars().filter(|c| *c == '.').count() > 0 {
        return opts.invalidEmailValue;
    }
    // split domain for detecting tld & subdomain
    let splittedDomain: Vec<&str> = domain.split(".").collect();
    // if the parts was less than 2 (that means only one word exist, not a valid domain) return
    if splittedDomain.len() < 2 {
        return opts.invalidEmailValue;
    }
    let domainName: String;
    // if splittedDomain length was more than 2 (that means it contains sub-subdomain)
    if splittedDomain.len() > 2 {
        // join sub-subdomains and subdomain
        let filtered = splittedDomain[0..splittedDomain.len() - 2].join("");
        domainName = filtered
    } else {
        // join subdomain only
        domainName = splittedDomain[0].to_string()
    }
    // get the tld
    let domainExtension: &str = splittedDomain[splittedDomain.len() - 1];
    // get characters. Usually used for `name.chars().len()` that returns `usize`
    let nameChars: Chars = name.chars();
    // convert usize to interger signed 32bit
    let nameLenRaw: Result<i32, TryFromIntError> = nameChars.clone().count().try_into();
    // if failed to parse, return
    if nameLenRaw.is_err() {
        return opts.invalidEmailValue;
    }
    // get the actual value if success
    let nameLen: i32 = nameLenRaw.unwrap();
    // some parsing, i cant really explain it here
    let visibleCharactersStartLength: i32;
    if opts.visibleCharacters.startLength > 0 && nameLen > 1 {
        if (nameLen - opts.minimumLength) > 0 {
            visibleCharactersStartLength = cmp::min(nameLen, opts.visibleCharacters.startLength)
        } else {
            visibleCharactersStartLength = cmp::min(0, opts.visibleCharacters.startLength)
        }
    } else {
        visibleCharactersStartLength = 0
    }
    let visibleCharactersEndLength: i32;
    if opts.visibleCharacters.endLength > 0
        && nameLen > (visibleCharactersStartLength + opts.minimumLength)
    {
        visibleCharactersEndLength = cmp::min(
            nameLen - visibleCharactersStartLength - opts.minimumLength,
            opts.visibleCharacters.endLength,
        )
    } else {
        visibleCharactersEndLength = 0
    }

    let visibleCharactersMiddleLength: i32;
    if opts.visibleCharacters.middleLength > 0
        && (nameLen
            - visibleCharactersStartLength
            - visibleCharactersEndLength
            - opts.minimumLength)
            > 0
    {
        visibleCharactersMiddleLength = cmp::min(
            visibleCharactersStartLength - visibleCharactersEndLength - opts.minimumLength,
            opts.visibleCharacters.middleLength,
        )
    } else {
        visibleCharactersMiddleLength = 0
    }
    let charactersLeftToObfuscate: i32 = cmp::max(
        0,
        nameLen - visibleCharactersStartLength - visibleCharactersEndLength,
    );
    let middleCharacters: &str;
    let endStr: &str;
    let parsedDomainName: String;
    let parsedDomainExtension: &str;
    if visibleCharactersMiddleLength > 0 {
        let filtered = name.substring(0, nameChars.clone().count());
        let idxRaw: Result<usize, TryFromIntError> =
            ((charactersLeftToObfuscate / 2) - (visibleCharactersMiddleLength / 2)).try_into();
        if idxRaw.is_err() {
            return opts.invalidEmailValue;
        }
        let res: &str = filtered.substring(idxRaw.unwrap(), nameChars.clone().count());
        middleCharacters = res
    } else {
        middleCharacters = ""
    }
    if visibleCharactersEndLength > 0 {
        let charsUsize: Result<usize, TryFromIntError> = visibleCharactersEndLength.try_into();
        if charsUsize.is_err() {
            return opts.invalidEmailValue;
        }
        endStr = name.substring(
            nameChars.clone().count() - charsUsize.unwrap(),
            nameChars.count(),
        )
    } else {
        endStr = ""
    }
    if opts.showDomainExtension {
        parsedDomainExtension = domainExtension
    } else {
        parsedDomainExtension = "***"
    }
    let nRaw1 = f32::from(opts.asterisksLength as f32 / 2.0).round();
    let n1 = (nRaw1 as i32).try_into().unwrap();
    let nRaw2 = f32::from(opts.asterisksLength as f32 / 2.0).round();
    let n2 = (nRaw2 as i32).try_into().unwrap();
    let nRaw3 = f32::from(opts.asterisksLength as f32 - 3.0).round();
    let n3 = (nRaw3 as i32).try_into().unwrap();
    if opts.showDomainName {
        parsedDomainName = domainName.clone().to_string()
    } else {
        let repeated_asterisks = "*".repeat(cmp::max(3, n3));
        parsedDomainName = repeated_asterisks
    }
    return format!(
        "{}{}{}{}{}@{}.{}",
        name.substring(0, visibleCharactersStartLength.try_into().unwrap()),
        "*".repeat(cmp::max(1, n1)),
        middleCharacters,
        "*".repeat(cmp::max(1, n2)),
        endStr,
        parsedDomainName,
        parsedDomainExtension
    );
    //   return `${name.substring(0, visibleCharactersStartLength)}${
    //     '*'.repeat(
    //       Math.max(1, Math.floor(opts.asterisksLength / 2)),
    //     )
    //   }${middleCharacters}${
    //     '*'.repeat(
    //       Math.max(1, Math.floor(opts.asterisksLength / 2)),
    //     )
    //   }${
    //     visibleCharactersEndLength > 0
    //       ? name.substring(name.length - visibleCharactersEndLength)
    //       : ''
    //   }@${
    //     opts.showDomainName
    //       ? domainName
    //       : '*'.repeat(Math.max(3, opts.asterisksLength - 3))
    //   }.${opts.showDomainExtension ? domainExtension : '***'}`;
}
