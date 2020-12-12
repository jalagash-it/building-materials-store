import { MutationTree } from 'vuex'

export type HeaderLayout = 'default' | 'compact'
export type DropcartType = 'dropdown' | 'offcanvas'

export interface OptionsState {
    headerLayout: HeaderLayout,
    dropcartType: DropcartType
}

function getDefaultState (): OptionsState {
    return {
        headerLayout: 'default',
        dropcartType: 'dropdown'
    }
}

export const state = getDefaultState

// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<OptionsState> = {
    setHeaderLayout (state, headerLayout: HeaderLayout) {
        state.headerLayout = headerLayout
    },
    setDropcartType (state, dropcartType: DropcartType) {
        state.dropcartType = dropcartType
    }
}
