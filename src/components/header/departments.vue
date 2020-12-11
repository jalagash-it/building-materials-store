<template>
    <!-- .departments -->
    <div
        :class="[
            'departments',
            {'departments--open': isOpen},
            {'departments--transition': isTransition}
        ]"
    >
        <div ref="body" class="departments__body">
            <div
                ref="content"
                class="departments__links-wrapper"
                @mouseleave="onMouseLeave"
            >
                <div ref="container" class="departments__submenus-container">
                    <template v-for="(department, index) in items">
                        <div
                            v-if="department.submenu && department.submenu.type === 'megamenu'"
                            ref="submenus"
                            :key="index"
                            :class="[
                                'departments__submenu',
                                'departments__submenu--type--megamenu',
                                `departments__submenu--size--${department.submenu.menu.size}`
                            ]"
                        >
                            <Megamenu location="departments" :menu="department.submenu.menu" />
                        </div>
                        <div
                            v-if="department.submenu && department.submenu.type === 'menu'"
                            ref="submenus"
                            :key="index"
                            :class="[
                                'departments__submenu',
                                'departments__submenu--type--menu'
                            ]"
                        >
                            <Menu :items="department.submenu.menu" />
                        </div>
                    </template>
                </div>
                <ul class="departments__links">
                    <li
                        v-for="(department, index) in items"
                        ref="items"
                        :key="index"
                        :class="[
                            'departments__item',
                            {'departments__item--menu': department.submenu && department.submenu.type === 'menu'},
                            {'departments__item--hover': department === hoveredItem}
                        ]"
                        @mouseenter="onItemMouseEnter(department)"
                    >
                        <AppLink class="departments__item-link" :to="department.url">
                            {{ department.title }}
                            <ArrowRoundedRight6x9Svg v-if="department.submenu" class="departments__item-arrow" />
                        </AppLink>
                    </li>
                </ul>
            </div>
        </div>

        <button class="departments__button" @click="onClickButton">
            <Menu18x14Svg class="departments__button-icon" />
            Shop By Category
            <ArrowRoundedDown9x6Svg class="departments__button-arrow" />
        </button>
    </div>
    <!-- .departments / end -->
</template>

<script lang="ts" src="./departments.ts" />
