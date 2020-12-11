<template>
    <div class="product__gallery">
        <div class="product-gallery">
            <div class="product-gallery__featured">
                <button
                    v-if="layout !== 'quickview'"
                    type="button"
                    class="product-gallery__zoom"
                    @click="handleZoomButtonClick"
                >
                    <ZoomIn24Svg />
                </button>
                <Carousel ref="featured" :options="featuredGalleryOptions">
                    <CarouselSlide v-for="(image, index) in images" :key="index">
                        <div class="product-image product-image--location--gallery">
                            <a
                                :href="$url.img(image)"
                                class="product-image__body"
                                target="_blank"
                                @click="handleFeaturedClick($event, index)"
                            >
                                <!--
                                The data-width and data-height attributes must contain the size of a larger
                                version of the product image.

                                If you do not know the image size, you can remove the data-width and data-height
                                attribute, in which case the width and height will be obtained from the
                                naturalWidth and naturalHeight property of img.product-image__img.
                                -->
                                <!--suppress HtmlUnknownTarget -->
                                <img
                                    ref="images"
                                    class="product-image__img"
                                    :src="$url.img(image)"
                                    alt=""
                                    data-width="700"
                                    data-height="700"
                                >
                            </a>
                        </div>
                    </CarouselSlide>
                </Carousel>
            </div>
            <div class="product-gallery__carousel">
                <Carousel ref="thumbnails" :options="thumbnailOptions">
                    <CarouselSlide v-for="(image, index) in images" :key="index">
                        <a
                            :class="[
                                'product-gallery__carousel-item product-image',
                                {'product-gallery__carousel-item--active': index === currentIndex}
                            ]"
                            @click="handleThumbnailClick(index)"
                        >
                            <span class="product-image__body">
                                <!--suppress HtmlUnknownTarget -->
                                <img
                                    class="product-image__img product-gallery__carousel-image"
                                    :src="$url.img(image)"
                                    alt=""
                                >
                            </span>
                        </a>
                    </CarouselSlide>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Swiper } from 'swiper'
import { IDirection } from '~/interfaces/language'
import type { createGalleryFn, Gallery, GalleryOptions } from '~/services/photoswipe'
import Carousel from '~/components/shared/carousel.vue'
import CarouselSlide from '~/components/shared/carousel-slide.vue'
import ZoomIn24Svg from '~/svg/zoom-in-24.svg'

export type ProductGalleryLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

const galleryOptions = {
    standard: {
        breakpoints: {
            380: { slidesPerView: 4 },
            480: { slidesPerView: 5 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 }
        }
    },
    sidebar: {
        breakpoints: {
            380: { slidesPerView: 4 },
            480: { slidesPerView: 5 },
            768: { slidesPerView: 4 }
        }
    },
    columnar: {
        breakpoints: {
            380: { slidesPerView: 4 },
            480: { slidesPerView: 5 },
            768: { slidesPerView: 4 }
        }
    },
    quickview: {
        breakpoints: {
            380: { slidesPerView: 4 },
            480: { slidesPerView: 5 },
            768: { slidesPerView: 4 },
            1200: { slidesPerView: 5 }
        }
    }
}

@Component({
    components: { ZoomIn24Svg, Carousel, CarouselSlide }
})
export default class ProductGallery extends Vue {
    @Prop({ type: String, required: true }) readonly layout!: ProductGalleryLayout
    @Prop({ type: Array, required: true }) readonly images!: string[]

    @Ref() readonly featured!: Carousel | null
    @Ref('images') readonly imageElements!: HTMLImageElement[]

    @Getter('locale/direction') direction!: IDirection

    createGallery: Promise<createGalleryFn> | null = null

    gallery: Gallery | null = null

    currentIndex: number = 0

    // noinspection JSUnusedGlobalSymbols
    featuredGalleryOptions = {
        pagination: {},
        on: {
            slideChangeTransitionStart: this.handleFeaturedSlideChange
        }
    }

    thumbnailOptions = Object.assign({
        spaceBetween: 10,
        slidesPerView: 3,
        pagination: {}
    }, galleryOptions[this.layout])

    mounted () {
        this.createGallery = import('~/services/photoswipe').then(module => module.default)
    }

    handleFeaturedSlideChange (swiper: Swiper) {
        this.currentIndex = swiper.activeIndex
    }

    handleZoomButtonClick () {
        this.openPhotoswipe(this.currentIndex)
    }

    handleFeaturedClick (event: MouseEvent, index: number) {
        if (this.layout === 'quickview') {
            return
        }

        event.preventDefault()

        this.openPhotoswipe(index)
    }

    handleThumbnailClick (index: number) {
        this.currentIndex = index

        if (this.featured && this.featured.swiper) {
            this.featured.swiper.slideTo(index)
        }
    }

    getIndexDependOnDir (index: number) {
        if (this.direction === 'rtl') {
            return this.images.length - 1 - index
        }

        return index
    }

    openPhotoswipe (index: number) {
        const items = this.imageElements.map((tag, index) => {
            if (!tag) {
                throw new Error('Image ref is null')
            }

            const width = (tag.dataset.width ? parseFloat(tag.dataset.width) : null) || tag.naturalWidth
            const height = (tag.dataset.height ? parseFloat(tag.dataset.height) : null) || tag.naturalHeight

            return {
                src: this.$url.img(this.images[index]),
                msrc: this.$url.img(this.images[index]),
                w: width,
                h: height
            }
        })

        if (this.direction === 'rtl') {
            items.reverse()
        }

        const options: GalleryOptions = {
            getThumbBoundsFn: (index) => {
                const tag = this.imageElements[this.getIndexDependOnDir(index)]

                if (!tag) {
                    return { x: 0, y: 0, w: 0 }
                }

                const width = tag.naturalWidth
                const height = tag.naturalHeight
                const rect = tag.getBoundingClientRect()
                const ration = Math.min(rect.width / width, rect.height / height)
                const fitWidth = width * ration
                const fitHeight = height * ration

                return {
                    x: rect.left + (rect.width - fitWidth) / 2 + window.pageXOffset,
                    y: rect.top + (rect.height - fitHeight) / 2 + window.pageYOffset,
                    w: fitWidth
                }
            },
            index: this.getIndexDependOnDir(index),
            bgOpacity: 0.9,
            history: false
        }

        this.createGallery && this.createGallery.then((createGallery) => {
            this.gallery = createGallery(items, options)
            this.gallery.listen('beforeChange', () => {
                if (this.gallery && this.featured && this.featured.swiper) {
                    this.featured.swiper.slideTo(
                        this.getIndexDependOnDir(this.gallery.getCurrentIndex()),
                        0
                    )
                }
            })
            this.gallery.listen('destroy', () => {
                this.gallery = null
            })

            this.gallery.init()
        })
    }
}

</script>
