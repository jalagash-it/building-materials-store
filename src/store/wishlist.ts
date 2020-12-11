import Vue from 'vue'
import { ActionTree, MutationTree } from 'vuex'
import { IProduct } from '~/interfaces/product'

export interface WishlistState {
    items: IProduct[];
}

export interface WishlistAddPayload {
    product: IProduct;
}

export interface WishlistRemovePayload {
    productId: number;
}

function getDefaultState (): WishlistState {
    return {
        items: []
    }
}

export const state = getDefaultState

export const mutations: MutationTree<WishlistState> = {
    add (state, payload: WishlistAddPayload): void {
        if (!state.items.find(x => x.id === payload.product.id)) {
            state.items.push(payload.product)
        }

        Vue.notify({
            type: 'success',
            text: `Product "${payload.product.name}" added to wish list!`
        })
    },
    remove (state, payload: WishlistRemovePayload): void {
        const index = state.items.findIndex(x => x.id === payload.productId)

        if (index !== -1) {
            state.items.splice(index, 1)
        }
    }
}

// noinspection JSUnusedGlobalSymbols
export const actions: ActionTree<WishlistState, {}> = {
    async add ({ commit }, payload: WishlistAddPayload): Promise<void> {
        await new Promise((resolve) => {
            setTimeout(() => {
                commit('add', payload)
                resolve()
            }, 500)
        })
    },
    async remove ({ commit }, payload: WishlistRemovePayload): Promise<void> {
        await new Promise((resolve) => {
            setTimeout(() => {
                commit('remove', payload)
                resolve()
            }, 500)
        })
    }
}
