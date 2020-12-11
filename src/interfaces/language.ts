export type IDirection = 'ltr' | 'rtl';

export interface IDictionary {
    [key: string]: string | IDictionary;
}

export interface IMessages {
    [locale: string]: IDictionary;
}

export interface ILanguage {
    locale: string;
    code: string;
    name: string;
    icon: string;
    direction: IDirection;
    messages: IMessages;
}
