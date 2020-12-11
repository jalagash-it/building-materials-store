<template>
    <div class="widget-aboutus widget">
        <h4 class="widget__title">
            About Blog
        </h4>
        <div class="widget-aboutus__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, erat in
            malesuada aliquam, est erat faucibus purus, eget viverra nulla sem vitae neque.
            Quisque id sodales libero.
        </div>

        <SocialLinks class="widget-aboutus__socials" shape="rounded" />
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import SocialLinks from '~/components/shared/social-links.vue'

@Component({
    components: { SocialLinks }
})
export default class WidgetAboutUs extends Vue { }

</script>
