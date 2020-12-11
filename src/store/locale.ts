import { GetterTree, MutationTree } from 'vuex'
import dataLanguages, { defaultLocale } from '~/data/languages'

export interface LocaleState {
    current: string;
}

function getDefaultState (): LocaleState {
    return {
        current: defaultLocale
    }
}

export const state = getDefaultState

export const getters: GetterTree<LocaleState, {}> = {
    language (store) {
        return dataLanguages.find(x => x.locale === store.current)
    },
    all () {
        return dataLanguages
    },
    default () {
        return dataLanguages.find(x => x.locale === defaultLocale)
    },
    direction (_, getters) {
        return getters.language.direction
    }
}

export const mutations: MutationTree<LocaleState> = {
    set (state, locale: string) {
        state.current = locale
    }
}
