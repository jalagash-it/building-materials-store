export type WatchFn = (element: Element | null) => void;

export type UnwatchFn = () => void;

export default new class {
    private state: Element | null = null;

    private watchers: WatchFn[] = [];

    get element (): Element | null {
        return this.state
    }

    watch (handler: WatchFn): UnwatchFn {
        this.watchers.push(handler)

        handler(this.element)

        return () => {
            this.unwatch(handler)
        }
    }

    unwatch (handler: WatchFn): void {
        this.watchers = this.watchers.filter(x => x !== handler)
    }

    set (element: Element | null): void {
        this.state = element
        this.watchers.forEach(x => x(element))
    }
}()
