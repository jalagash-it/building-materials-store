<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'
import { IProduct } from '~/interfaces/product'

type WithCurrent<T extends {}> = T & {current: boolean}

@Component
export default class BlockProductsCarouselContainer<Tab extends {}> extends Vue {
    @Prop({ type: Array, default: () => null }) readonly initialData!: IProduct[] | null
    @Prop({ type: Array, default: () => [] }) readonly tabs!: Tab[]
    @Prop({ type: Function, required: true }) readonly dataSource!: (tab: Tab) => Promise<IProduct[]>

    products: IProduct[] = this.initialData || []

    isLoading: boolean = this.initialData === null

    internalTabs: WithCurrent<Tab>[] = this.tabs.map(tab => ({ ...tab, current: false }))

    cancel = () => {}

    mounted () {
        if (this.internalTabs.length > 0) {
            const firstTab = this.internalTabs[0]

            if (this.isLoading) {
                this.handleTabChange(firstTab).then()
            } else {
                this.internalTabs.forEach((tab) => {
                    tab.current = tab === firstTab
                })
            }
        }
    }

    async handleTabChange (currentTab: WithCurrent<Tab>) {
        this.cancel()

        let canceled = false

        this.cancel = () => {
            canceled = true
        }

        this.internalTabs.forEach((tab) => {
            tab.current = tab === currentTab
        })

        this.isLoading = true

        const products = await this.dataSource(currentTab)

        if (canceled) {
            return
        }

        this.products = products
        this.isLoading = false
    }

    render (createElement: CreateElement): VNode {
        const children = this.$scopedSlots.default ? this.$scopedSlots.default({
            products: this.products,
            isLoading: this.isLoading,
            tabs: this.internalTabs,
            handleTabChange: this.handleTabChange
        }) : null

        return createElement('div', {}, children)
    }
}

</script>
