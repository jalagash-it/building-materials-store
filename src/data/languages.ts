import { ILanguage } from '~/interfaces/language'

const dataLanguages: ILanguage[] = [
    {
        locale: 'en',
        code: 'EN',
        name: 'English',
        icon: '/images/languages/language-1.png',
        direction: 'ltr',
        messages: require('../locales/en.json')
    },
    {
        locale: 'ru',
        code: 'RU',
        name: 'Russian',
        icon: '/images/languages/language-2.png',
        direction: 'ltr',
        messages: require('../locales/ru.json')
    },
    {
        locale: 'kk',
        code: 'KK',
        name: 'Kazakh',
        icon: '/images/languages/language-3.png',
        direction: 'ltr',
        messages: require('../locales/kk.json')
    }
]

export const defaultLocale = 'kk'

export default dataLanguages
