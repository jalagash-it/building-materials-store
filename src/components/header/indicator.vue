<template>
    <div
        :class="[
            'indicator',
            `indicator--trigger--${trigger}`,
            {
                'indicator--mobile': location === 'mobile-header',
                'indicator--hover': isHovered,
                'indicator--display': isDisplay,
                'indicator--open': isOpen,
            }
        ]"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <AppLink v-if="to && trigger !== 'click'" :to="to" class="indicator__button" @click.native="onClick">
            <span class="indicator__area">
                <slot name="icon" />
                <span v-if="value !== null" class="indicator__value">{{ value }}</span>
            </span>
        </AppLink>
        <a v-if="to && trigger === 'click'" :href="$url.anyLink(to)" class="indicator__button" @click="onClick">
            <span class="indicator__area">
                <slot name="icon" />
                <span v-if="value !== null" class="indicator__value">{{ value }}</span>
            </span>
        </a>
        <button v-if="!to" type="button" class="indicator__button" @click="onClick">
            <span class="indicator__area">
                <slot name="icon" />
                <span v-if="value !== null" class="indicator__value">{{ value }}</span>
            </span>
        </button>
        <div v-if="$slots.default" ref="dropdown" class="indicator__dropdown">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" src="./indicator.ts" />
