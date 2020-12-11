<template>
    <ShopPageCategory :columns="4" view-mode="grid" />
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { ParsedQuery } from 'query-string'
import { parseQueryFilters, parseQueryOptions } from '~/services/helpers'
import ShopPageCategory from '~/components/shop/shop-page-category.vue'

@Component({
    components: { ShopPageCategory },
    async asyncData ({ store, query }): Promise<object | void> {
        const options = parseQueryOptions(query as ParsedQuery)
        const filters = parseQueryFilters(query as ParsedQuery)

        await store.dispatch('shop/init', {
            categorySlug: 'power-tools',
            options,
            filters
        })
    }
})
export default class Page extends Vue { }

</script>
