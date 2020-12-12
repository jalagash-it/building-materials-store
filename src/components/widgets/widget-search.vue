<template>
    <div class="widget-search">
        <form class="widget-search__body">
            <input
                class="widget-search__input"
                placeholder="Blog search..."
                type="text"
                autoComplete="off"
                spellCheck="false"
                aria-label="Search"
            >
            <button class="widget-search__button" type="submit">
                <Search20Svg />
            </button>
        </form>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import Search20Svg from '~/svg/search-20.svg'

@Component({
    components: { Search20Svg }
})
export default class WidgetSearch extends Vue { }

</script>
