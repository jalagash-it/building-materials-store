import { IOrderSummary } from '~/interfaces/order'

const dataAccountOrders: IOrderSummary[] = [
    {
        id: 8132,
        date: '02 April, 2019',
        status: 'Pending',
        quantity: 5,
        total: 2719
    },
    {
        id: 7592,
        date: '28 March, 2019',
        status: 'Pending',
        quantity: 3,
        total: 374
    },
    {
        id: 7192,
        date: '15 March, 2019',
        status: 'Shipped',
        quantity: 4,
        total: 791
    },
    {
        id: 6321,
        date: '28 February, 2019',
        status: 'Completed',
        quantity: 1,
        total: 57
    },
    {
        id: 6001,
        date: '21 February, 2019',
        status: 'Completed',
        quantity: 2,
        total: 252
    },
    {
        id: 4120,
        date: '11 December, 2018',
        status: 'Completed',
        quantity: 7,
        total: 3978
    }
]

export default dataAccountOrders
