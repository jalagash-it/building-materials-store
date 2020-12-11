<template>
    <Layout>
        <nuxt />
    </Layout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import Layout from '~/components/layout.vue'

@Component({
    components: { Layout }
})
export default class DefaultLayout extends Vue { }

</script>
