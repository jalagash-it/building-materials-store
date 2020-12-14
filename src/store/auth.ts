import { GetterTree, MutationTree } from 'vuex'
import IUser from '~/interfaces/user';
export interface AuthState {
    user: IUser | null
}

function getDefaultState(): AuthState {
    return {
        user: null
    }
}

export const getters: GetterTree<AuthState, {}> = {
    language(store) {
        return store.user;
    },

}
export const mutations: MutationTree<AuthState> = {
    setUser(state, user: IUser | null) {
        state.user = user
    }
}


export const state = getDefaultState