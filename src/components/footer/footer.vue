<template>
    <div class="site-footer">
        <div class="container">
            <div class="site-footer__widgets">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4">
                        <footer-contacts />
                    </div>
                    <div class="col-6 col-md-3 col-lg-2">
                        <footer-links
                            title="Information"
                            :links="[
                                {title: 'About Us', url: ''},
                                {title: 'Delivery Information', url: ''},
                                {title: 'Privacy Policy', url: ''},
                                {title: 'Brands', url: ''},
                                {title: 'Contact Us', url: ''},
                                {title: 'Returns', url: ''},
                                {title: 'Site Map', url: ''}
                            ]"
                        />
                    </div>
                    <div class="col-6 col-md-3 col-lg-2">
                        <footer-links
                            title="My Account"
                            :links="[
                                {title: 'Store Location', url: ''},
                                {title: 'Order History', url: ''},
                                {title: 'Wish List', url: ''},
                                {title: 'Newsletter', url: ''},
                                {title: 'Specials', url: ''},
                                {title: 'Gift Certificates', url: ''},
                                {title: 'Affiliate', url: ''}
                            ]"
                        />
                    </div>
                    <div class="col-12 col-md-12 col-lg-4">
                        <footer-newsletter />
                    </div>
                </div>
            </div>

            <div class="site-footer__bottom">
                <div class="site-footer__copyright">
                    <!-- copyright -->
                    Powered by <a href="https://vuejs.org/" target="_blank">Vue.js</a> —
                    Design by <a :href="theme.author.profile_url" target="_blank">{{ theme.author.name }}</a>
                    <!-- copyright / end -->
                </div>
                <div class="site-footer__payments">
                    <img :src="$url.img('/images/payments.png')" alt="">
                </div>
            </div>
        </div>
        <ToTop />
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import FooterContacts from '~/components/footer/footer-contacts.vue'
import FooterLinks from '~/components/footer/footer-links.vue'
import FooterNewsletter from '~/components/footer/footer-newsletter.vue'
import ToTop from '~/components/footer/to-top.vue'
import theme from '~/data/theme'

@Component({
    components: { ToTop, FooterNewsletter, FooterLinks, FooterContacts }
})
export default class Footer extends Vue {
    theme = theme
}

</script>
