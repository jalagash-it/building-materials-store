<template>
    <div>
        <b-modal
            ref="modal"
            :hide-header="true"
            :hide-footer="true"
            :centered="true"
            size="xl"
            body-class="p-0"
            @show="handleModalShow"
            @hide="$store.commit('quickview/close')"
            @hidden="showProduct = false"
        >
            <div class="quickview">
                <button class="quickview__close" type="button" @click="$refs.modal.hide()">
                    <Cross20Svg />
                </button>

                <Product v-if="product && showProduct" :product="product" layout="quickview" />
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Watch, Ref } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { BModal } from 'bootstrap-vue'
import { RootState } from '~/store'
import { IProduct } from '~/interfaces/product'
import Product from '~/components/shared/product.vue'
import Cross20Svg from '~/svg/cross-20.svg'

@Component({
    components: { Cross20Svg, Product }
})
export default class Quickview extends Vue {
    @State((state: RootState) => state.quickview.open) isOpen!: boolean
    @State((state: RootState) => state.quickview.product) product!: IProduct | null

    @Ref() modal!: BModal

    showProduct: boolean = false

    @Watch('isOpen')
    onIsOpenChange (newValue: boolean) {
        if (newValue) {
            this.modal.show()
        } else {
            this.modal.hide()
        }
    }

    handleModalShow () {
        setTimeout(() => {
            this.showProduct = true
        }, 50)
    }
}

</script>
