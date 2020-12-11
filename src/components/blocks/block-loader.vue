<template>
    <div class="block-loader">
        <div class="block-loader__spinner" />
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'

@Component
export default class BlockLoader extends Vue { }

</script>
