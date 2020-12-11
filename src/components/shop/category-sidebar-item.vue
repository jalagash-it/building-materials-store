<template>
    <div class="block-sidebar__item">
        <slot />
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class CategorySidebarItem extends Vue { }

</script>
