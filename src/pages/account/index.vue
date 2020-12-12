<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { Context } from '@nuxt/types'

@Component({
    middleware ({ redirect, $url }: Context) {
        return redirect(
            $url.lang($url.accountDashboard())
        )
    }
})
export default class Page extends Vue { }

</script>
