export interface IList<T> {
    /** Array of list items. */
    items: T[];
}

export interface IPaginatedList<T> extends IList<T> {
    /** Current page. */
    page: number;

    /** Items per page. */
    limit: number;

    /** Sorting algorithm. */
    sort: string;

    /** Total items in list. Not a items.length. */
    total: number;

    /** Total number of pages. */
    pages: number;

    /** Common number of the first item on the current page. */
    from: number;

    /** Common number of the last item on the current page. */
    to: number;
}

export interface IFilterableList<T, F> extends IList<T> {
    filters: F[];
}

export interface IListOptions {
    sort?: string;
    limit?: number;
    page?: number;
}

export interface IFilterValues {
    [filterSlug: string]: string;
}
