import { ISpec } from '~/interfaces/spec'

const dataShopProductSpec: ISpec = [
    {
        name: 'General',
        attributes: [
            { name: 'Material', value: 'Aluminium, Plastic' },
            { name: 'Engine Type', value: 'Brushless' },
            { name: 'Battery Voltage', value: '18 V' },
            { name: 'Battery Type', value: 'Li-lon' },
            { name: 'Number of Speeds', value: '2' },
            { name: 'Charge Time', value: '1.08 h' },
            { name: 'Weight', value: '1.5 kg' }
        ]
    },
    {
        name: 'Dimensions',
        attributes: [
            { name: 'Length', value: '99 mm' },
            { name: 'Width', value: '207 mm' },
            { name: 'Height', value: '208 mm' }
        ]
    }
]

export default dataShopProductSpec
