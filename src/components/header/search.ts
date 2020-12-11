import { Vue, Component, Prop, Inject } from 'vue-property-decorator'
import shopApi from '~/api/shop'
import { IProduct } from '~/interfaces/product'
import { IShopCategory } from '~/interfaces/category'
import AsyncAction from '~/components/shared/async-action.vue'
import Search20Svg from '~/svg/search-20.svg'
import Cross20Svg from '~/svg/cross-20.svg'
import Cart16Svg from '~/svg/cart-16.svg'

type Location = 'header';

type ICategoryWithDepth = IShopCategory & {depth: number};

function getCategoriesWithDepth (categories: IShopCategory[], depth = 0): ICategoryWithDepth[] {
    return categories.reduce<ICategoryWithDepth[]>((acc, category) => [
        ...acc,
        { ...category, depth },
        ...getCategoriesWithDepth(category.children || [], depth + 1)
    ], [])
}

@Component({
    components: { AsyncAction, Cross20Svg, Search20Svg, Cart16Svg }
})
export default class Search extends Vue {
    @Prop({ type: String, default: () => 'header' }) readonly location!: Location

    @Inject({ from: 'getSearchScope', default: null }) readonly getSearchScope!: (() => Element) | null

    query: string = ''
    category: string = ''
    categories: ICategoryWithDepth[] = []
    suggestedProducts: IProduct[] = []
    hasSuggestions: boolean = false
    suggestionsOpen: boolean = false
    cancel: () => void = () => {}
    teardown: Array<() => void> = []

    get scope () {
        return (this.getSearchScope && this.getSearchScope()) || this.$el
    }

    async mounted () {
        const scope = this.scope

        scope.addEventListener('focusout', this.onFocusout)

        document.addEventListener('click', this.onGlobalClick)

        this.teardown.push(() => document.removeEventListener('click', this.onGlobalClick))
        this.teardown.push(() => document.removeEventListener('focusout', this.onFocusout))

        this.categories = getCategoriesWithDepth(await shopApi.getCategories({ depth: 1 }))
    }

    beforeDestroy () {
        this.teardown.forEach(x => x())
    }

    onFocusout () {
        setTimeout(() => {
            const scope = this.scope

            if (document.activeElement === document.body) {
                return
            }

            // Close suggestions if the focus received an external element.
            if (document.activeElement && !scope.contains(document.activeElement)) {
                this.closeSuggestion()
            }
        }, 10)
    }

    onGlobalClick (event: MouseEvent) {
        const scope = this.scope

        // Close suggestion if click performed outside of component.
        if (event.target instanceof HTMLElement && !scope.contains(event.target)) {
            this.closeSuggestion()
        }
    }

    onQueryInput (event: InputEvent) {
        this.query = (event.target as HTMLInputElement).value
        this.search().then()
    }

    onQueryFocus () {
        this.openSuggestion()
    }

    onQueryEscape () {
        this.$emit('close')
    }

    onCategoryChange (event: InputEvent) {
        this.category = (event.target as HTMLInputElement).value
    }

    onCategoryFocus () {
        this.closeSuggestion()
    }

    onCloseClick () {
        this.$emit('close')
    }

    openSuggestion () {
        this.suggestionsOpen = true
    }

    closeSuggestion () {
        this.suggestionsOpen = false
    }

    focus () {
        const input = this.$refs.input as HTMLInputElement

        input.focus()
    }

    async search () {
        this.cancel()

        let canceled = false

        this.cancel = () => {
            canceled = true
        }

        const query = this.query.trim()
        const products = query === '' ? [] : await shopApi.getSuggestions(query, {
            category: this.category === '' ? undefined : this.category,
            limit: 5
        })

        if (canceled) {
            return
        }

        this.hasSuggestions = products.length > 0

        if (products.length > 0) {
            this.suggestedProducts = products
        }
    }
}
