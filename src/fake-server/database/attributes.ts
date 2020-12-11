import { IAttributeDef } from '../interfaces/attributes'

const attributesDef: IAttributeDef[] = [
    {
        name: 'Color',
        slug: 'color',
        values: [
            { name: 'White', slug: 'white' },
            { name: 'Silver', slug: 'silver' },
            { name: 'Light Gray', slug: 'light-gray' },
            { name: 'Gray', slug: 'gray' },
            { name: 'Dark Gray', slug: 'dark-gray' },
            { name: 'Coal', slug: 'coal' },
            { name: 'Black', slug: 'black' },
            { name: 'Red', slug: 'red' },
            { name: 'Orange', slug: 'orange' },
            { name: 'Yellow', slug: 'yellow' },
            { name: 'Pear Green', slug: 'pear-green' },
            { name: 'Green', slug: 'green' },
            { name: 'Emerald', slug: 'emerald' },
            { name: 'Shamrock', slug: 'shamrock' },
            { name: 'Shakespeare', slug: 'shakespeare' },
            { name: 'Blue', slug: 'blue' },
            { name: 'Dark Blue', slug: 'dark-blue' },
            { name: 'Violet', slug: 'violet' },
            { name: 'Purple', slug: 'purple' },
            { name: 'Cerise', slug: 'cerise' }
        ]
    },
    {
        name: 'Speed',
        slug: 'speed',
        values: [
            { name: '750 RPM', slug: '750-rpm' }
        ]
    },
    {
        name: 'Power Source',
        slug: 'power-source',
        values: [
            { name: 'Cordless-Electric', slug: 'cordless-electric' }
        ]
    },
    {
        name: 'Battery Cell Type',
        slug: 'battery-cell-type',
        values: [
            { name: 'Lithium', slug: 'lithium' }
        ]
    },
    {
        name: 'Voltage',
        slug: 'voltage',
        values: [
            { name: '20 Volts', slug: '20-volts' }
        ]
    },
    {
        name: 'Battery Capacity',
        slug: 'battery-capacity',
        values: [
            { name: '2 Ah', slug: '2-Ah' }
        ]
    }
]

export default attributesDef
