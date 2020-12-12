<template>
    <div class="block block-banner">
        <div class="container">
            <AppLink to="/" class="block-banner__body">
                <div
                    class="block-banner__image block-banner__image--desktop"
                    :style="{
                        backgroundImage: `url(${$url.img('/images/banners/banner-1.jpg')})`
                    }"
                />
                <div
                    class="block-banner__image block-banner__image--mobile"
                    :style="{
                        backgroundImage: `url(${$url.img('/images/banners/banner-1-mobile.jpg')})`
                    }"
                />
                <div class="block-banner__title">
                    Hundreds
                    <br class="block-banner__mobile-br">
                    Hand Tools
                </div>
                <div class="block-banner__text">
                    Hammers, Chisels, Universal Pliers, Nippers, Jigsaws, Saws
                </div>
                <div class="block-banner__button">
                    <span class="btn btn-sm btn-primary">Shop Now</span>
                </div>
            </AppLink>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    components: { AppLink }
})
export default class BlockBanner extends Vue { }

</script>
