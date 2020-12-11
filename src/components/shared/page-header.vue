<template>
    <div class="page-header">
        <div class="page-header__container container">
            <div class="page-header__breadcrumb">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <template v-for="(item, index) in breadcrumb">
                            <li v-if="index !== breadcrumb.length - 1" :key="index" class="breadcrumb-item">
                                <AppLink :to="item.url">
                                    {{ item.title }}
                                </AppLink>
                                <ArrowRoundedRight6x9Svg class="breadcrumb-arrow" />
                            </li>
                            <li v-if="index === breadcrumb.length - 1" :key="index" class="breadcrumb-item active">
                                {{ item.title }}
                            </li>
                        </template>
                    </ol>
                </nav>
            </div>
            <div v-if="title" class="page-header__title">
                <h1>{{ title }}</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { ILink } from '~/interfaces/menus/link'
import AppLink from '~/components/shared/app-link.vue'
import ArrowRoundedRight6x9Svg from '~/svg/arrow-rounded-right-6x9.svg'

@Component({
    components: { AppLink, ArrowRoundedRight6x9Svg }
})
export default class PageHeader extends Vue {
    @Prop({ type: String, default: () => '' }) readonly title!: string
    @Prop({ type: Array, default: () => [] }) readonly breadcrumb!: ILink[]
}

</script>
