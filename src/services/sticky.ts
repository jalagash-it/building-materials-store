export interface StickyClasses {
    stuck?: string;
    show?: string;
}

export default class Sticky {
    private events: {[eventName: string]: Array<() => void>} = {}

    // mode = 'alwaysOnTop'
    mode = 'pullToShow'

    enabled = false

    stuck = false
    shown = false

    scrollDistance = 0
    scrollPosition = 0
    positionWhenToFix = () => 0
    positionWhenToStick = () => 0

    showImmediate = false

    constructor (
        private element: HTMLElement,
        private classes: StickyClasses = {}
    ) {
        this.onScroll = this.onScroll.bind(this)

        document.addEventListener('scroll', this.onScroll, { passive: true })
    }

    start (): void {
        this.enabled = true
    }

    // noinspection JSUnusedGlobalSymbols
    stop (): void {
        this.enabled = false
    }

    destroy (): void {
        document.removeEventListener('scroll', this.onScroll)
    }

    onScroll (): void {
        if (!this.enabled) {
            return
        }

        const scrollDelta = window.pageYOffset - this.scrollPosition

        // scroll direction changed
        if ((scrollDelta < 0) !== (this.scrollDistance < 0)) {
            this.scrollDistance = 0
        }

        this.scrollPosition = window.pageYOffset
        this.scrollDistance += scrollDelta

        if (window.pageYOffset > this.positionWhenToStick()) {
            if (!this.stuck) {
                this.stuck = true

                if (this.classes.stuck) {
                    this.element.classList.add(this.classes.stuck)
                }

                this.element.style.transitionDuration = '0s'

                if (this.mode === 'alwaysOnTop' && this.showImmediate && this.classes.show) {
                    this.shown = true
                    this.element.classList.add(this.classes.show)
                }

                this.element.getBoundingClientRect() // force reflow
                this.element.style.transitionDuration = ''

                if (this.mode === 'alwaysOnTop' && !this.showImmediate && this.classes.show) {
                    this.shown = true
                    this.element.classList.add(this.classes.show)
                }

                this.emit('stuck')

                if (this.mode === 'pullToShow') {
                    this.emit('hide')
                }
            }

            if (this.mode === 'pullToShow') {
                const distanceToShow = 10 // in pixels
                const distanceToHide = 25 // in pixels

                if (this.scrollDistance < -distanceToShow && !this.shown) {
                    this.shown = true
                    this.classes.show && this.element.classList.add(this.classes.show)
                    this.emit('show')
                }
                if (this.scrollDistance > distanceToHide && this.shown) {
                    this.shown = false
                    this.classes.show && this.element.classList.remove(this.classes.show)
                    this.emit('hide')
                }
            }
        } else if (window.pageYOffset <= this.positionWhenToFix()) {
            if (this.stuck) {
                this.stuck = false
                this.shown = false

                this.classes.stuck && this.element.classList.remove(this.classes.stuck)
                this.classes.show && this.element.classList.remove(this.classes.show)

                this.emit('fix')
            }
        }
    }

    calc (element: Element, boundingElements: Element[] = []): void {
        this.stuck = false
        this.shown = false

        this.classes.stuck && this.element.classList.remove(this.classes.stuck)
        this.classes.show && this.element.classList.remove(this.classes.show)

        this.scrollDistance = 0
        this.scrollPosition = window.pageYOffset

        const rect = element.getBoundingClientRect()
        const top = rect.top + (this.stuck ? 0 : window.pageYOffset)
        const bottom = top + rect.height
        const boundingBottom = boundingElements.length > 0 ? Math.max(...boundingElements
            .map(x => x.getBoundingClientRect())
            .map(x => x.top + x.height)) + window.pageYOffset : bottom

        if (boundingBottom > bottom) {
            this.positionWhenToFix = () => boundingBottom
            this.positionWhenToStick = () => boundingBottom
            this.showImmediate = false
        } else if (this.mode === 'alwaysOnTop') {
            this.positionWhenToFix = () => top
            this.positionWhenToStick = () => top
            this.showImmediate = true
        } else {
            this.positionWhenToFix = () => this.shown ? top : bottom
            this.positionWhenToStick = () => bottom
        }

        this.onScroll()
    }

    on (event: string, handler: () => void) {
        if (!(event in this.events)) {
            this.events[event] = []
        }

        if (!this.events[event].includes(handler)) {
            this.events[event].push(handler)
        }
    }

    emit (event: string) {
        if (!(event in this.events)) {
            return
        }

        this.events[event].forEach(x => x())
    }
}
