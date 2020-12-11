<template>
    <div class="spec">
        <h3 class="spec__header">
            Specification
        </h3>
        <div v-for="(section, index) in sections" :key="index" class="spec__section">
            <h4 class="spec__section-title">
                {{ section.name }}
            </h4>
            <div v-for="(attribute, attributeIndex) in section.attributes" :key="attributeIndex" class="spec__row">
                <div class="spec__name">
                    {{ attribute.name }}
                </div>
                <div class="spec__value">
                    {{ attribute.value }}
                </div>
            </div>
        </div>
        <div class="spec__disclaimer">
            Information on technical characteristics, the delivery set, the country of
            manufacture and the appearance of the goods is for reference only and is based on
            the latest information available at the time of publication.
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { ISpec } from '~/interfaces/spec'
import dataShopProductSpec from '~/data/shopProductSpec'

@Component
export default class ProductTabSpecification extends Vue {
    sections: ISpec = dataShopProductSpec
}

</script>
