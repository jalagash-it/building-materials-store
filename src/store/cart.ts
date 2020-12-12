import Vue from 'vue'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IProduct } from '~/interfaces/product'
import { Cart, CartItem, CartItemOption, CartTotal } from '~/interfaces/cart'

export interface CartState extends Cart {
    lastItemId: number;
}

function getDefaultState (): CartState {
    return {
        lastItemId: 0,
        items: [],
        quantity: 0,
        subtotal: 0,
        totals: [],
        total: 0
    }
}

export const state = getDefaultState

export interface CartItemQuantity {
    itemId: number;
    value: number;
}

export type CartAddPayload = {
    product: IProduct;
    options?: CartItemOption[];
    quantity?: number;
};

export type CartRemovePayload = {
    itemId: number;
};

export type CartUpdateQuantitiesPayload = CartItemQuantity[];

function findItemIndex (items: CartItem[], product: IProduct, options: CartItemOption[]): number {
    return items.findIndex((item) => {
        if (item.product.id !== product.id || item.options.length !== options.length) {
            return false
        }

        for (let i = 0; i < options.length; i += 1) {
            const option = options[i]
            const itemOption = item.options.find(itemOption => (
                itemOption.optionId === option.optionId && itemOption.valueId === option.valueId
            ))

            if (!itemOption) {
                return false
            }
        }

        return true
    })
}

function calcSubtotal (items: CartItem[]): number {
    return items.reduce((subtotal, item) => subtotal + item.total, 0)
}

function calcQuantity (items: CartItem[]): number {
    return items.reduce((quantity, item) => quantity + item.quantity, 0)
}

function calcTotals (items: CartItem[]): CartTotal[] {
    if (items.length === 0) {
        return []
    }

    const subtotal = calcSubtotal(items)

    return [
        {
            type: 'shipping',
            title: 'Shipping',
            price: 25
        },
        {
            type: 'tax',
            title: 'Tax',
            price: subtotal * 0.2
        }
    ]
}

function calcTotal (subtotal: number, totals: CartTotal[]): number {
    return totals.reduce((acc, extraLine) => acc + extraLine.price, subtotal)
}

// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<CartState> = {
    add (state, payload: CartAddPayload) {
        const { product, options = [], quantity = 1 } = payload
        const itemIndex = findItemIndex(state.items, product, options)

        if (itemIndex === -1) {
            state.items.push({
                id: ++state.lastItemId,
                product: JSON.parse(JSON.stringify(product)),
                options: JSON.parse(JSON.stringify(options)),
                price: product.price,
                quantity,
                total: product.price * quantity
            })
        } else {
            const item = state.items[itemIndex]

            item.quantity += quantity
            item.total = item.price * item.quantity
        }

        state.quantity = calcQuantity(state.items)
        state.subtotal = calcSubtotal(state.items)
        state.totals = calcTotals(state.items)
        state.total = calcTotal(state.subtotal, state.totals)

        Vue.notify({
            type: 'success',
            text: `Product "${product.name}" added to cart!`
        })
    },
    remove (state, payload: CartRemovePayload) {
        const { itemId } = payload

        state.items = state.items.filter(item => item.id !== itemId)
        state.quantity = calcQuantity(state.items)
        state.subtotal = calcSubtotal(state.items)
        state.totals = calcTotals(state.items)
        state.total = calcTotal(state.subtotal, state.totals)
    },
    updateQuantities (state, payload: CartUpdateQuantitiesPayload) {
        let needUpdate = false

        state.items.forEach((item) => {
            const quantity = payload.find(x => x.itemId === item.id && x.value !== item.quantity)

            if (!quantity) {
                return
            }

            needUpdate = true

            item.quantity = quantity.value
            item.total = item.price * item.quantity
        })

        if (needUpdate) {
            state.quantity = calcQuantity(state.items)
            state.subtotal = calcSubtotal(state.items)
            state.totals = calcTotals(state.items)
            state.total = calcTotal(state.subtotal, state.totals)
        }
    }
}

// noinspection JSUnusedGlobalSymbols
export const actions: ActionTree<CartState, {}> = {
    async add ({ commit }, payload: CartAddPayload): Promise<void> {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 500)
        })

        commit('add', payload)
    },
    async remove ({ commit }, payload: CartRemovePayload): Promise<void> {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 500)
        })

        commit('remove', payload)
    },
    async updateQuantities ({ commit }, payload: CartUpdateQuantitiesPayload): Promise<void> {
        await new Promise((resolve) => {
            setTimeout(() => {
                commit('updateQuantities', payload)
                resolve()
            }, 500)
        })
    }
}

export const getters: GetterTree<CartState, {}> = {
    quantity (store) {
        return store.quantity
    }
}
