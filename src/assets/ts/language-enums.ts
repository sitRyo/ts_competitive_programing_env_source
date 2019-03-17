interface LanguagesInterface {
  TS_BROWSER: string;
  JS_BROWSER: string;
  [key: string]: string;
}

// Don't change Enum member's number so that use const Enum
export const languages: LanguagesInterface = {
  TS_BROWSER: 'typescript',
  JS_BROWSER: 'javascript',
};
