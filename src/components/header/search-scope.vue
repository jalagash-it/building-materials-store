<script lang="ts">

import { Vue, Component, Provide } from 'vue-property-decorator'
import { VNode } from 'vue'

@Component
export default class SearchScope extends Vue {
    @Provide() getSearchScope () {
        if (this.$slots.default && this.$slots.default[0]) {
            return this.$slots.default[0].elm
        }

        return null
    }

    render (): VNode | null {
        return this.$slots.default && this.$slots.default[0] ? this.$slots.default[0] : null
    }
}

</script>
