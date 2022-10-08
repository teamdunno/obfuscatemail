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
