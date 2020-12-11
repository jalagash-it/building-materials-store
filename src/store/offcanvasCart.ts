import { MutationTree } from 'vuex'

export interface OffcanvasCartState {
    isOpen: boolean;
}

function getDefaultState (): OffcanvasCartState {
    return {
        isOpen: false
    }
}

export const state = getDefaultState

export const mutations: MutationTree<OffcanvasCartState> = {
    open (state) {
        state.isOpen = true
    },
    close (state) {
        state.isOpen = false
    }
}
