declare module "utils" {
    export function getOptions(options: Options): Options;
    export type Options = {
        asterisksLength?: number;
        minimumNameObfuscationLength?: number;
        visibleCharactersStartLength?: number;
        visibleCharactersMiddleLength?: number;
        visibleCharactersEndLength?: number;
        showDomainName?: boolean;
        showDomainExtension?: boolean;
        invalidEmailValue?: string;
    };
    export type OptionsKeys = [keyof Options];
    export const DEFAULT_OPTIONS: Options;
}
declare module "obfuscateEmail" {
    export = obfuscateEmail;
    function obfuscateEmail(email: string, options?: import("utils").Options): string;
    namespace obfuscateEmail {
        export { DEFAULT_OPTIONS };
    }
    import { DEFAULT_OPTIONS } from "utils";
}
