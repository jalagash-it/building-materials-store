<template>
    <div class="reviews-view">
        <div class="reviews-view__list">
            <h3 class="reviews-view__header">
                Customer Reviews
            </h3>

            <div class="reviews-list">
                <ol class="reviews-list__content">
                    <li v-for="(review, index) in reviews" :key="index" class="reviews-list__item">
                        <div class="review">
                            <div class="review__avatar">
                                <!--suppress HtmlUnknownTarget -->
                                <img :src="$url.img(review.avatar)" alt="">
                            </div>
                            <div class=" review__content">
                                <div class=" review__author">
                                    {{ review.author }}
                                </div>
                                <div class=" review__rating">
                                    <Rating :value="review.rating" />
                                </div>
                                <div class=" review__text">
                                    {{ review.text }}
                                </div>
                                <div class=" review__date">
                                    {{ review.date }}
                                </div>
                            </div>
                        </div>
                    </li>
                </ol>
                <div class="reviews-list__pagination">
                    <Pagination :current="1" :siblings="2" :total="10" />
                </div>
            </div>
        </div>

        <form class="reviews-view__form">
            <h3 class="reviews-view__header">
                Write A Review
            </h3>
            <div class="row">
                <div class="col-12 col-lg-9 col-xl-8">
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="review-stars">Review Stars</label>
                            <select id="review-stars" class="form-control">
                                <option>5 Stars Rating</option>
                                <option>4 Stars Rating</option>
                                <option>3 Stars Rating</option>
                                <option>2 Stars Rating</option>
                                <option>1 Stars Rating</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="review-author">Your Name</label>
                            <input
                                id="review-author"
                                class="form-control"
                                type="text"
                                placeholder="Your Name"
                            >
                        </div>
                        <div class="form-group col-md-4">
                            <label for="review-email">Email Address</label>
                            <input
                                id="review-email"
                                class="form-control"
                                type="text"
                                placeholder="Email Address"
                            >
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="review-text">Your Review</label>
                        <textarea
                            id="review-text"
                            class="form-control"
                            :rows="6"
                        />
                    </div>
                    <div class="form-group mb-0">
                        <button type="submit" class="btn btn-primary btn-lg">
                            Post Your Review
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { IReview } from '~/interfaces/review'
import Pagination from '~/components/shared/pagination.vue'
import Rating from '~/components/shared/rating.vue'
import dataShopProductReviews from '~/data/shopProductReviews'

@Component({
    components: { Pagination, Rating }
})
export default class ProductTabReviews extends Vue {
    reviews: IReview[] = dataShopProductReviews
}

</script>
