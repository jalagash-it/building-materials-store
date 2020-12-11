import Vue from 'vue'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IProduct } from '~/interfaces/product'

export interface CompareState {
    items: IProduct[];
}

export interface CompareAddPayload {
    product: IProduct;
}

export interface CompareRemovePayload {
    productId: number;
}

function getDefaultState (): CompareState {
    return {
        items: []
    }
}

export const state = getDefaultState

export const mutations: MutationTree<CompareState> = {
    add (state, payload: CompareAddPayload): void {
        if (!state.items.find(x => x.id === payload.product.id)) {
            state.items.push(payload.product)
        }

        Vue.notify({
            type: 'success',
            text: `Product "${payload.product.name}" added to compare!`
        })
    },
    remove (state, payload: CompareRemovePayload): void {
        const index = state.items.findIndex(x => x.id === payload.productId)

        if (index !== -1) {
            state.items.splice(index, 1)
        }
    }
}

// noinspection JSUnusedGlobalSymbols
export const actions: ActionTree<CompareState, {}> = {
    async add ({ commit }, payload: CompareAddPayload): Promise<void> {
        await new Promise((resolve) => {
            setTimeout(() => {
                commit('add', payload)
                resolve()
            }, 500)
        })
    },
    async remove ({ commit }, payload: CompareRemovePayload): Promise<void> {
        await new Promise((resolve) => {
            setTimeout(() => {
                commit('remove', payload)
                resolve()
            }, 500)
        })
    }
}

export const getters: GetterTree<CompareState, {}> = {
    items (store) {
        return store.items
    }
}
