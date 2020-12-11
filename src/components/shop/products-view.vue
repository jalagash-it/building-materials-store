<template>
    <div
        :class="[
            'products-view',
            {'products-view--loading': $store.getters['shop/productsListIsLoading']}
        ]"
    >
        <div class="products-view__loader" />

        <div v-if="productsList.items.length === 0" class="products-view__empty">
            <div class="products-view__empty-title">
                No matching items
            </div>
            <div class="products-view__empty-subtitle">
                Try resetting the filters
            </div>
            <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="$store.dispatch('shop/resetFilters')"
            >
                Reset filters
            </button>
        </div>

        <div v-if="productsList.items.length !== 0" class="products-view__content">
            <div class="products-view__options">
                <div
                    :class="[
                        'view-options',
                        {
                            'view-options--offcanvas--always': offcanvas === 'always',
                            'view-options--offcanvas--mobile': offcanvas === 'mobile',
                        }
                    ]"
                >
                    <div class="view-options__filters-button">
                        <button type="button" class="filters-button" @click="$emit('openSidebar')">
                            <Filters16Svg class="filters-button__icon" />
                            <span class="filters-button__title">Filters</span>
                            <span v-if="filtersCount" class="filters-button__counter">{{ filtersCount }}</span>
                        </button>
                    </div>
                    <div class="view-options__layout">
                        <div class="layout-switcher">
                            <div class="layout-switcher__list">
                                <button
                                    v-for="viewMode in viewModes"
                                    :key="viewMode.key"
                                    :title="viewMode.title"
                                    :class="[
                                        'layout-switcher__button',
                                        {'layout-switcher__button--active': currentLayout === viewMode.key}
                                    ]"
                                    type="button"
                                    @click="currentLayout = viewMode.key"
                                >
                                    <component :is="viewMode.icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="view-options__legend">
                        Showing {{ productsList.from }}—{{ productsList.to }} of {{ productsList.total }} products
                    </div>
                    <div class="view-options__divider" />
                    <div class="view-options__control">
                        <label for="view-options-sort">Sort By</label>
                        <div>
                            <select
                                id="view-options-sort"
                                class="form-control form-control-sm"
                                :value="options.sort || productsList.sort"
                                @change="handleSortChange"
                            >
                                <option value="default">
                                    Default
                                </option>
                                <option value="name_asc">
                                    Name (A-Z)
                                </option>
                                <option value="name_desc">
                                    Name (Z-A)
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="view-options__control">
                        <label for="view-options-limit">Show</label>
                        <div>
                            <select
                                id="view-options-limit"
                                class="form-control form-control-sm"
                                :value="options.limit || productsList.limit"
                                @change="handleLimitChange"
                            >
                                <option value="6">
                                    6
                                </option>
                                <option value="12">
                                    12
                                </option>
                                <option value="18">
                                    18
                                </option>
                                <option value="24">
                                    24
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="products-view__list products-list"
                :data-layout="currentLayout !== 'list' ? grid : currentLayout"
                :data-with-features="currentLayout === 'grid-with-features' ? 'true' : 'false'"
                :data-mobile-grid-columns="2"
            >
                <div class="products-list__body">
                    <div v-for="product in productsList.items" :key="product.id" class="products-list__item">
                        <ProductCard :product="product" />
                    </div>
                </div>
            </div>

            <div class="products-view__pagination">
                <Pagination
                    :current="options.page || productsList.page"
                    :siblings="2"
                    :total="productsList.pages"
                    @page-change="handlePageChange"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { VueConstructor } from 'vue'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { IProductsList } from '~/interfaces/product'
import { IFilterValues, IListOptions } from '~/interfaces/list'
import Pagination from '~/components/shared/pagination.vue'
import ProductCard from '~/components/shared/product-card.vue'
import Filters16Svg from '~/svg/filters-16.svg'
import LayoutGrid16x16Svg from '~/svg/layout-grid-16x16.svg'
import LayoutGridWithDetails16x16Svg from '~/svg/layout-grid-with-details-16x16.svg'
import LayoutList16x16Svg from '~/svg/layout-list-16x16.svg'

export type ProductsViewLayout = 'grid' | 'grid-with-features' | 'list';
export type ProductsViewGrid = 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full';
export type ProductsViewOffcanvas = 'always' | 'mobile';

interface ViewMode {
    key: ProductsViewLayout
    title: string
    icon: VueConstructor
}

@Component({
    components: { Pagination, ProductCard, Filters16Svg }
})
export default class ProductsView extends Vue {
    @Prop({ type: String, default: () => 'grid' }) readonly layout!: ProductsViewLayout
    @Prop({ type: String, default: () => 'grid-3-sidebar' }) readonly grid!: ProductsViewGrid
    @Prop({ type: String, default: () => 'mobile' }) readonly offcanvas!: ProductsViewOffcanvas

    @Getter('shop/productsList') productsList!: IProductsList
    @Getter('shop/options') options!: IListOptions
    @Getter('shop/filters') filters!: IFilterValues

    currentLayout: ProductsViewLayout = this.layout

    viewModes: ViewMode[] = [
        { key: 'grid', title: 'Grid', icon: LayoutGrid16x16Svg },
        { key: 'grid-with-features', title: 'Grid With Features', icon: LayoutGridWithDetails16x16Svg },
        { key: 'list', title: 'List', icon: LayoutList16x16Svg }
    ]

    get filtersCount () {
        return Object.keys(this.filters).map(x => this.filters[x]).filter(x => x).length
    }

    handlePageChange (page: number) {
        this.$store.dispatch('shop/setOptionValue', {
            option: 'page',
            value: page
        })
    }

    handleSortChange (event: InputEvent) {
        if (!(event.target instanceof HTMLSelectElement)) {
            return
        }

        this.$store.dispatch('shop/setOptionValue', {
            option: 'sort',
            value: event.target.value
        })
    }

    handleLimitChange (event: InputEvent) {
        if (!(event.target instanceof HTMLSelectElement)) {
            return
        }

        this.$store.dispatch('shop/setOptionValue', {
            option: 'limit',
            value: parseFloat(event.target.value)
        })
    }
}

</script>
