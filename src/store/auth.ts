import { GetterTree, MutationTree } from 'vuex'
import IUser from '~/interfaces/user';
export interface AuthState {
    user: IUser
}

function getDefaultState(): AuthState {
    return {
        user: { id: -1, email: '', token: '' }
    }
}

export const getters: GetterTree<AuthState, {}> = {
    language(store) {
        return store.user;
    },

}
export const mutations: MutationTree<AuthState> = {
    setUser(state, user) {
        state.user = user
    }
}


export const state = getDefaultState