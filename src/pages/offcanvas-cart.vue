<template>
    <div>
        <PageHeader
            title="Offcanvas Cart"
            :breadcrumb="[
                { title: 'Home', url: '/' },
                { title: 'Offcanvas Cart', url: '/' },
            ]"
        />

        <div class="block-empty__body">
            <div class="block-empty__message">
                Click on the button to open the offcanvas cart!
            </div>
            <div class="block-empty__actions">
                <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="$store.commit('offcanvasCart/open')"
                >
                    Open Cart
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { Context } from '@nuxt/types'
import PageHeader from '~/components/shared/page-header.vue'

@Component({
    components: { PageHeader },
    asyncData (context: Context) {
        context.store.commit('options/setHeaderLayout', 'default')
        context.store.commit('options/setDropcartType', 'offcanvas')
    },
    head () {
        return {
            title: 'Offcanvas Cart'
        }
    }
})
export default class Page extends Vue { }

</script>
