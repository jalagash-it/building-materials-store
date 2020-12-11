<template>
    <div class="block block-brands">
        <div class="container">
            <div class="block-brands__slider">
                <Carousel :options="carouselOptions">
                    <CarouselSlide v-for="(brand, index) in brands" :key="index">
                        <div class="block-brands__item">
                            <AppLink to="/">
                                <!--suppress HtmlUnknownTarget -->
                                <img :src="$url.img(brand.image)" alt="">
                            </AppLink>
                        </div>
                    </CarouselSlide>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { SwiperOptions } from 'swiper/types/swiper-options'
import Carousel from '~/components/shared/carousel.vue'
import CarouselSlide from '~/components/shared/carousel-slide.vue'
import AppLink from '~/components/shared/app-link.vue'
import dataShopBrands from '~/data/shopBrands'

const carouselOptions: SwiperOptions = {
    pagination: {},
    roundLengths: true,
    slidesPerView: 2,
    breakpoints: {
        1200: { slidesPerView: 6 },
        992: { slidesPerView: 5 },
        768: { slidesPerView: 4 },
        576: { slidesPerView: 3 }
    }
}

@Component({
    components: { Carousel, CarouselSlide, AppLink }
})
export default class BlockBrands extends Vue {
    brands = dataShopBrands
    carouselOptions = carouselOptions
}

</script>
