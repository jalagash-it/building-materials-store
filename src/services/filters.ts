// application
import { isArrayOfStrings } from './helpers'
import {
    ICheckFilterValue,
    IColorFilterValue,
    IFilter,
    IRadioFilterValue,
    IRangeFilterValue
} from '~/interfaces/filter'

interface IFilterHandler<T extends IFilter = IFilter, V = any> {
    serialize: (value: V) => string;
    deserialize: (value: string) => V;
    isDefaultValue: (filter: T, value: V) => boolean;
    getDefaultValue: (filter: T) => V;
}

function isRangeFilterValue (value: any): value is IRangeFilterValue {
    if (!Array.isArray(value) || value.length !== 2) {
        return false
    }

    return !(typeof value[0] !== 'number' || typeof value[1] !== 'number')
}
function isCheckFilterValue (value: any): value is ICheckFilterValue {
    return isArrayOfStrings(value)
}
function isRadioFilterValue (value: any): value is IRadioFilterValue {
    return value === null || typeof value === 'string'
}
function isColorFilterValue (value: any): value is IColorFilterValue {
    return isArrayOfStrings(value)
}

const CheckFilterHandler: IFilterHandler = {
    serialize: (value) => {
        if (!isCheckFilterValue(value)) {
            throw new Error('Provide a valid "check" filter value!')
        }

        return value.join(',')
    },
    deserialize: value => (
        value ? value.split(',') : []
    ),
    isDefaultValue: (_filter, value) => {
        if (!isCheckFilterValue(value)) {
            throw new Error('Provide a valid "check" filter value!')
        }

        return value.length === 0
    },
    getDefaultValue: () => []
}

const ColorFilterHandler: IFilterHandler = {
    serialize: (value) => {
        if (!isColorFilterValue(value)) {
            throw new Error('Provide a valid "color" filter value!')
        }

        return value.join(',')
    },
    deserialize: (value: string) => (
        value ? value.split(',') : []
    ),
    isDefaultValue: (_filter, value) => {
        if (!isColorFilterValue(value)) {
            throw new Error('Provide a valid "check" filter value!')
        }

        return value.length === 0
    },
    getDefaultValue: () => []
}

const RadioFilterHandler: IFilterHandler = {
    serialize: (value) => {
        if (!isRadioFilterValue(value)) {
            throw new Error('Provide a valid "radio" filter value!')
        }

        return value === null ? '' : value
    },
    deserialize: (value: string) => value,
    isDefaultValue: (filter, value) => {
        if (!isRadioFilterValue(value)) {
            throw new Error('Provide a valid "radio" filter value!')
        }

        return RadioFilterHandler.getDefaultValue(filter) === value
    },
    getDefaultValue: (filter) => {
        if (filter.type !== 'radio') {
            throw new Error('Provide a "radio" filter!')
        }

        return filter.items[0].slug
    }
}

const RangeFilterHandler: IFilterHandler = {
    serialize: (value) => {
        if (!isRangeFilterValue(value)) {
            throw new Error('Provide a valid "range" filter value!')
        }

        return value.join('-')
    },
    deserialize: (value: string) => (
        value ? value.split('-').map(parseFloat) : undefined
    ),
    isDefaultValue: (filter, value) => {
        if (filter.type !== 'range') {
            throw new Error('Provide a "range" filter!')
        }
        if (!isRangeFilterValue(value)) {
            throw new Error('Provide a valid "range" filter value!')
        }

        return filter.min === value[0] && filter.max === value[1]
    },
    getDefaultValue: (filter) => {
        if (filter.type !== 'range') {
            throw new Error('Provide a "range" filter!')
        }

        return [filter.min, filter.max]
    }
}

function getFilterHandler<T extends IFilter> (filter: T): IFilterHandler<T, T['value']> | null {
    switch (filter.type) {
    case 'check': return CheckFilterHandler
    case 'color': return ColorFilterHandler
    case 'radio': return RadioFilterHandler
    case 'range': return RangeFilterHandler
    default:
        return null
    }
}

function getExistsFilterHandler<T extends IFilter> (filter: T): IFilterHandler<T, T['value']> {
    const handler = getFilterHandler(filter)

    if (!handler) {
        throw new Error('Unhandled filter type!')
    }

    return handler
}

export function isDefaultFilterValue<T extends IFilter> (filter: T, value: T['value']): boolean {
    return getExistsFilterHandler(filter).isDefaultValue(filter, value)
}

export function getFilterDefaultValue<T extends IFilter> (filter: T): T['value'] {
    return getExistsFilterHandler(filter).getDefaultValue(filter)
}

export function serializeFilterValue<T extends IFilter> (filter: T, value: T['value']): string | null {
    return getExistsFilterHandler(filter).serialize(value)
}

export function deserializeFilterValue<T extends IFilter = IFilter> (filter: T, value: string): T['value'] {
    return getExistsFilterHandler(filter).deserialize(value)
}

export function getFilterValue<T extends IFilter = IFilter> (filter: T, currentSerializedValue: string): T['value'] {
    return deserializeFilterValue(filter, currentSerializedValue) || getFilterDefaultValue(filter)
}
