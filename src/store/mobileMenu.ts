import { MutationTree } from 'vuex'

export interface MobileMenuState {
    isOpen: boolean;
}

function getDefaultState (): MobileMenuState {
    return {
        isOpen: false
    }
}

export const state = getDefaultState

export const mutations: MutationTree<MobileMenuState> = {
    open (state) {
        state.isOpen = true
    },
    close (state) {
        state.isOpen = false
    }
}
