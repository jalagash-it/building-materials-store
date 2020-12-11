<template>
    <div class="site-footer__widget footer-links">
        <h5 class="footer-links__title">
            {{ title }}
        </h5>
        <ul class="footer-links__list">
            <li v-for="link in links" :key="link.title" class="footer-links__item">
                <AppLink :to="link.url" class="footer-links__link">
                    {{ link.title }}
                </AppLink>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { ILink } from '~/interfaces/menus/link'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    components: { AppLink }
})
export default class FooterLinks extends Vue {
    @Prop({ type: String, default: () => '' }) readonly title!: string
    @Prop({ type: Array, default: () => [] }) readonly links!: ILink[]
}

</script>
