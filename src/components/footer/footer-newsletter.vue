<template>
    <div class="site-footer__widget footer-newsletter">
        <h5 class="footer-newsletter__title">
            Newsletter
        </h5>
        <div class="footer-newsletter__text">
            Praesent pellentesque volutpat ex, vitae auctor lorem pulvinar mollis felis at lacinia.
        </div>

        <form action="" class="footer-newsletter__form">
            <label class="sr-only" for="footer-newsletter-address">Email Address</label>
            <input
                id="footer-newsletter-address"
                class="footer-newsletter__form-input form-control"
                type="text"
                placeholder="Email Address..."
            >

            <button class="footer-newsletter__form-button btn btn-primary">
                Subscribe
            </button>
        </form>

        <div class="footer-newsletter__text footer-newsletter__text--social">
            Follow us on social networks
        </div>

        <social-links class="footer-newsletter__social-links" shape="circle" />
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import SocialLinks from '~/components/shared/social-links.vue'

@Component({
    components: { SocialLinks }
})
export default class FooterNewsletter extends Vue { }

</script>
