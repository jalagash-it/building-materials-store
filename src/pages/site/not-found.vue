<template>
    <LayoutError :error="{statusCode: 404, message: 'Page Not Found'}" />
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import LayoutError from '~/layouts/error.vue'

@Component({
    components: { LayoutError }
})
export default class Page extends Vue { }

</script>
