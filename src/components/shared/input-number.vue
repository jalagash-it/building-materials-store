<template>
    <div class="input-number">
        <!--suppress HtmlFormInputWithoutLabel -->
        <input
            :id="id"
            :class="[
                'form-control',
                'input-number__input',
                {
                    'form-control-sm': size === 'sm',
                    'form-control-lg': size === 'lg',
                }
            ]"
            :value="value"
            :step="step"
            :min="min"
            :max="max"
            :disabled="disabled"
            :readonly="readonly"
            type="number"
            @input="handleInput"
        >
        <div class="input-number__add" @mousedown="handleAddMouseDown" />
        <div class="input-number__sub" @mousedown="handleSubMouseDown" />
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'

export type InputNumberSize = 'sm' | 'lg';

@Component
export default class InputNumber extends Vue {
    @Prop({ type: String, default: () => null }) readonly id!: number | null
    @Prop({ type: String, default: () => null }) readonly size!: InputNumberSize | null
    @Prop({ type: [String, Number], default: () => '' }) readonly value!: string | number
    @Prop({ type: Number, default: () => 1 }) readonly step!: number
    @Prop({ type: Number, default: () => null }) readonly min!: number | null
    @Prop({ type: Number, default: () => null }) readonly max!: number | null
    @Prop({ type: Boolean, default: () => false }) readonly disabled!: boolean
    @Prop({ type: Boolean, default: () => false }) readonly readonly!: boolean

    handleInput (event: InputEvent) {
        if (event.target instanceof HTMLInputElement) {
            if (event.target.value.trim() === '') {
                this.$emit('input', '')
            } else {
                const value = parseFloat(event.target.value)

                this.$emit('input', Number.isNaN(value) ? (this.min || 0) : value)
            }
        }
    }

    handleAddMouseDown () {
        this.change(1)
        this.changeByTimer(1)
    }

    handleSubMouseDown () {
        this.change(-1)
        this.changeByTimer(-1)
    }

    change (direction: -1 | 1, prevValue?: string | number) {
        prevValue = typeof prevValue === 'undefined' ? this.value : prevValue

        // noinspection SuspiciousTypeOfGuard
        let newValue = typeof prevValue === 'string' ? parseFloat(prevValue) : prevValue

        newValue = (Number.isNaN(newValue) ? 0 : newValue) + this.step * direction

        if (this.max !== null) {
            newValue = Math.min(this.max, newValue)
        }
        if (this.min !== null) {
            newValue = Math.max(this.min, newValue)
        }

        if (newValue !== prevValue) {
            this.$emit('input', newValue)
        }

        return newValue
    }

    changeByTimer (direction: -1 | 1) {
        let prevValue = this.value
        let interval: any
        const timer = setTimeout(() => {
            interval = setInterval(() => {
                prevValue = this.change(direction, prevValue)
            }, 50)
        }, 300)

        const documentMouseUp = () => {
            clearTimeout(timer)
            clearInterval(interval)

            document.removeEventListener('mouseup', documentMouseUp, false)
        }

        document.addEventListener('mouseup', documentMouseUp, false)
    }
}

</script>
