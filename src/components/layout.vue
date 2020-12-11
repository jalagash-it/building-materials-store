<template>
    <!-- site -->
    <div class="site">
        <div class="site__container">
            <!-- mobile site__header -->
            <header class="site__header d-lg-none">
                <mobile-header sticky-mode="pullToShow" />
            </header>
            <!-- mobile site__header / end -->

            <!-- desktop site__header -->
            <header class="site__header d-lg-block d-none">
                <Header />
            </header>
            <!-- desktop site__header / end -->

            <!-- site__body -->
            <div class="site__body">
                <slot />
            </div>
            <!-- site__body / end -->

            <!-- site__footer -->
            <footer class="site__footer">
                <Footer />
            </footer>
            <!-- site__footer / end -->
        </div>

        <!-- quickview-modal -->
        <Quickview />
        <!-- quickview-modal / end -->

        <!-- mobilemenu -->
        <MobileMenu />
        <!-- mobilemenu / end -->

        <client-only>
            <!--suppress HtmlUnknownTag -->
            <notifications classes="vue-toast" />
        </client-only>

        <dropcart v-if="dropcartType === 'offcanvas'" type="offcanvas" />
    </div>
    <!-- site / end -->
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { RootState } from '~/store'
import { DropcartType } from '~/store/options'
import Footer from '~/components/footer/footer.vue'
import Header from '~/components/header/header.vue'
import MobileHeader from '~/components/mobile/mobile-header.vue'
import Dropcart from '~/components/header/dropcart.vue'
import MobileMenu from '~/components/mobile/mobile-menu.vue'
import Quickview from '~/components/shared/quickview.vue'

@Component({
    components: {
        MobileMenu,
        Dropcart,
        MobileHeader,
        Header,
        Footer,
        Quickview
    },
    head (this: Layout) {
        return {
            bodyAttrs: {
                class: this.bodyClasses
            }
        }
    }
})
export default class Layout extends Vue {
    @State((state: RootState) => state.options.dropcartType) dropcartType!: DropcartType

    bodyClasses = ['disable-transitions']

    async mounted () {
        await this.$nextTick()

        this.bodyClasses = []
    }
}

</script>
