<template>
    <div class="widget-tags widget">
        <h4 class="widget__title">
            Tags Cloud
        </h4>
        <div class="tags tags--lg">
            <div class="tags__list">
                <AppLink v-for="(tag, index) in tags" :key="index" to="/">
                    {{ tag }}
                </AppLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import AppLink from '~/components/shared/app-link.vue'

@Component({
    components: { AppLink }
})
export default class WidgetTags extends Vue {
    tags = [
        'Promotion',
        'Power Tool',
        'New Arrivals',
        'Screwdriver',
        'Wrench',
        'Mounts',
        'Electrodes',
        'Chainsaws',
        'Manometers',
        'Nails',
        'Air Guns',
        'Cutting Discs'
    ]
}

</script>
