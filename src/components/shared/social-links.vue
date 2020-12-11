<template>
    <div :class="[$attrs.class, 'social-links', `social-links--shape--${shape}`]">
        <ul class="social-links__list">
            <li v-for="item in items" :key="item.type" class="social-links__item">
                <a
                    :class="['social-links__link', `social-links__link--type--${item.type}`]"
                    :href="item.url"
                    target="_blank"
                >
                    <i :class="item.icon" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import theme from '~/data/theme'

type Shape = 'circle' | 'rounded';

@Component
export default class SocialLinks extends Vue {
    @Prop({ type: String, default: () => 'circle' }) readonly shape!: Shape

    items = [
        { type: 'rss', icon: 'fas fa-rss', url: theme.author.profile_url },
        { type: 'youtube', icon: 'fab fa-youtube', url: theme.author.profile_url },
        { type: 'facebook', icon: 'fab fa-facebook-f', url: theme.author.profile_url },
        { type: 'twitter', icon: 'fab fa-twitter', url: theme.author.profile_url },
        { type: 'instagram', icon: 'fab fa-instagram', url: theme.author.profile_url }
    ]
}

</script>
