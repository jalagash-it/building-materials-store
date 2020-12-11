<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { VNode } from 'vue'

@Component
export default class AsyncAction extends Vue {
    @Prop({ type: Function, required: true }) readonly action!: () => Promise<void>

    isLoading: boolean = false

    run () {
        if (!this.action || this.isLoading) {
            return
        }

        this.isLoading = true
        this.action().then(() => {
            this.isLoading = false
        })
    }

    render (): VNode | null {
        const children = this.$scopedSlots.default ? this.$scopedSlots.default({
            run: this.run,
            isLoading: this.isLoading
        }) || null : null

        if (children) {
            return children[0]
        }

        return null
    }
}

</script>
