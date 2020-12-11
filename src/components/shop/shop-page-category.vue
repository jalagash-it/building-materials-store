<template>
    <div>
        <BlockLoader v-if="isLoading" />

        <template v-if="!isLoading">
            <PageHeader :title="pageTitle" :breadcrumb="breadcrumb" />

            <CategoryLayout
                :columns="columns"
                :sidebar-position="sidebarPosition"
            >
                <template v-slot:sidebar>
                    <CategorySidebar
                        :is-open="sidebarIsOpen"
                        :offcanvas="offcanvas"
                        @closeSidebar="sidebarIsOpen = false"
                    >
                        <CategorySidebarItem>
                            <WidgetFilters title="Filters" :offcanvas="offcanvas" />
                        </CategorySidebarItem>
                        <CategorySidebarItem v-if="offcanvas !== 'always'" class="d-none d-lg-block">
                            <WidgetProducts title="Latest Products" :products="latestProducts" />
                        </CategorySidebarItem>
                    </CategorySidebar>
                </template>

                <template v-slot:productsView>
                    <ProductsView
                        :layout="viewMode"
                        :grid="productsViewGrid"
                        :offcanvas="offcanvas"
                        @openSidebar="sidebarIsOpen = true"
                    />
                </template>
            </CategoryLayout>
        </template>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Context } from '@nuxt/types'
import * as qs from 'query-string'
import { IProduct } from '~/interfaces/product'
import { ILink } from '~/interfaces/menus/link'
import { ICategory } from '~/interfaces/category'
import { getCategoryParents } from '~/services/helpers'
import shopApi from '~/api/shop'
import PageHeader from '~/components/shared/page-header.vue'
import BlockLoader from '~/components/blocks/block-loader.vue'
import WidgetFilters from '~/components/widgets/widget-filters.vue'
import WidgetProducts from '~/components/widgets/widget-products.vue'
import ProductsView from '~/components/shop/products-view.vue'
import CategorySidebar from '~/components/shop/category-sidebar.vue'
import CategorySidebarItem from '~/components/shop/category-sidebar-item.vue'
import CategoryLayout from '~/components/shop/category-layout.vue'

export type ShopPageCategoryColumns = 3 | 4 | 5;
export type ShopPageCategoryViewMode = 'grid' | 'grid-with-features' | 'list';
export type ShopPageCategorySidebarPosition = 'start' | 'end';

@Component({
    components: {
        PageHeader,
        ProductsView,
        CategorySidebar,
        CategorySidebarItem,
        BlockLoader,
        CategoryLayout,
        WidgetFilters,
        WidgetProducts
    },
    head (this: ShopPageCategory) {
        return {
            title: this.pageTitle
        }
    }
})
export default class ShopPageCategory extends Vue {
    @Prop({ type: Number, default: () => 3 }) readonly columns!: ShopPageCategoryColumns
    @Prop({ type: String, default: () => 'grid' }) readonly viewMode!: ShopPageCategoryViewMode
    @Prop({ type: String, default: () => 'start' }) readonly sidebarPosition!: ShopPageCategorySidebarPosition

    @Getter('shop/query') query!: string
    @Getter('shop/category') category!: ICategory | null
    @Getter('shop/isLoading') isLoading!: boolean

    sidebarIsOpen: boolean = false

    latestProducts: IProduct[] = []

    get offcanvas () {
        return this.columns === 3 ? 'mobile' : 'always'
    }

    get productsViewGrid () {
        return `grid-${this.columns}-${this.columns > 3 ? 'full' : 'sidebar'}`
    }

    get pageTitle () {
        return this.category ? this.category.name : 'Shop'
    }

    get breadcrumb (): ILink[] {
        const breadcrumb = [
            { title: 'Home', url: this.$url.home() },
            { title: 'Shop', url: this.$url.catalog() }
        ]

        if (this.category) {
            getCategoryParents(this.category).forEach((parent) => {
                breadcrumb.push({ title: parent.name, url: this.$url.category(parent) })
            })

            breadcrumb.push({ title: this.category.name, url: this.$url.category(this.category) })
        }

        return breadcrumb
    }

    async asyncData ({ store }: Context): Promise<object | void> {
        await store.dispatch('shop/init', {
            categorySlug: null,
            options: {},
            filters: {}
        })
    }

    mounted () {
        if (this.offcanvas === 'mobile') {
            shopApi.getLatestProducts({ limit: 5 }).then((result) => {
                this.latestProducts = result
            })
        }
    }

    @Watch('query')
    onQueryChange (query: string) {
        const href = qs.stringifyUrl({
            ...qs.parseUrl(window.location.href),
            query: qs.parse(query)
        }, { encode: false })

        window.history.replaceState(
            window.history.state,
            '',
            href
        )
    }
}

</script>
