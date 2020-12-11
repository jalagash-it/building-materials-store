import { makeIdGenerator, nameToSlug } from '../utils'
import { ICategoryDef } from '../interfaces/categories'
import { IBaseCategory, IShopCategory } from '~/interfaces/category'

const getId = makeIdGenerator()

const categoriesDef: ICategoryDef[] = [
    {
        name: 'Instruments',
        slug: 'instruments',
        items: 272,
        children: [
            {
                name: 'Power Tools',
                slug: 'power-tools',
                image: 'assets/images/categories/category-1.jpg',
                items: 370,
                children: [
                    {
                        name: 'Drills & Mixers',
                        slug: 'drills-mixers',
                        items: 57
                    },
                    {
                        name: 'Cordless Screwdrivers',
                        slug: 'cordless-screwdrivers',
                        items: 15
                    },
                    {
                        name: 'Screwdrivers',
                        slug: 'screwdrivers',
                        items: 126
                    },
                    {
                        name: 'Wrenches',
                        slug: 'wrenches',
                        items: 12
                    },
                    {
                        name: 'Grinding Machines',
                        slug: 'grinding-machines',
                        items: 25
                    },
                    {
                        name: 'Milling Cutters',
                        slug: 'milling-cutters',
                        items: 78
                    },
                    {
                        name: 'Electric Spray Guns',
                        slug: 'electric-spray-guns',
                        items: 3
                    }
                ]
            },
            {
                name: 'Hand Tools',
                slug: 'hand-tools',
                image: 'assets/images/categories/category-2.jpg',
                items: 134,
                children: [
                    {
                        name: 'Tool Kits',
                        slug: 'tool-kits',
                        items: 57
                    },
                    {
                        name: 'Hammers',
                        slug: 'hammers',
                        items: 15
                    },
                    {
                        name: 'Spanners',
                        slug: 'spanners',
                        items: 5
                    },
                    {
                        name: 'Handsaws',
                        slug: 'handsaws',
                        items: 54
                    },
                    {
                        name: 'Paint Tools',
                        slug: 'paint-tools',
                        items: 13
                    }
                ]
            },
            {
                name: 'Machine Tools',
                slug: 'machine-tools',
                image: 'assets/images/categories/category-3.jpg',
                items: 302,
                children: [
                    {
                        name: 'Lathes',
                        slug: 'lathes',
                        items: 104
                    },
                    {
                        name: 'Milling Machines',
                        slug: 'milling-machines',
                        items: 12
                    },
                    {
                        name: 'Grinding Machines',
                        slug: 'grinding-machines',
                        items: 67
                    },
                    {
                        name: 'CNC Machines',
                        slug: 'cnc-machines',
                        items: 5
                    },
                    {
                        name: 'Sharpening Machines',
                        slug: 'sharpening-machines',
                        items: 88
                    }
                ]
            },
            {
                name: 'Power Machinery',
                slug: 'power-machinery',
                image: 'assets/images/categories/category-4.jpg',
                items: 79,
                children: [
                    {
                        name: 'Generators',
                        slug: 'generators',
                        items: 23
                    },
                    {
                        name: 'Compressors',
                        slug: 'compressors',
                        items: 76
                    },
                    {
                        name: 'Winches',
                        slug: 'winches',
                        items: 43
                    },
                    {
                        name: 'Plasma Cutting',
                        slug: 'plasma-cutting',
                        items: 128
                    },
                    {
                        name: 'Electric Motors',
                        slug: 'electric-motors',
                        items: 76
                    }
                ]
            },
            {
                name: 'Measurement',
                slug: 'measurement',
                image: 'assets/images/categories/category-5.jpg',
                items: 366,
                children: [
                    {
                        name: 'Tape Measure',
                        slug: 'tape-measure',
                        items: 57
                    },
                    {
                        name: 'Theodolites',
                        slug: 'theodolites',
                        items: 5
                    },
                    {
                        name: 'Thermal Imagers',
                        slug: 'thermal-imagers',
                        items: 3
                    },
                    {
                        name: 'Calipers',
                        slug: 'calipers',
                        items: 37
                    },
                    {
                        name: 'Levels',
                        slug: 'levels',
                        items: 14
                    }
                ]
            },
            {
                name: 'Clothes and PPE',
                slug: 'clothes-and-ppe',
                image: 'assets/images/categories/category-6.jpg',
                items: 82,
                children: [
                    {
                        name: 'Winter Workwear',
                        slug: 'winter-workwear',
                        items: 24
                    },
                    {
                        name: 'Summer Workwear',
                        slug: 'summer-workwear',
                        items: 87
                    },
                    {
                        name: 'Helmets',
                        slug: 'helmets',
                        items: 9
                    },
                    {
                        name: 'Belts and Bags',
                        slug: 'belts-and-bags',
                        items: 1
                    },
                    {
                        name: 'Work Shoes',
                        slug: 'work-shoes',
                        items: 0
                    }
                ]
            }
        ]
    },
    {
        name: 'Electronics',
        slug: 'electronics',
        items: 54
    },
    {
        name: 'Computers',
        slug: 'computers',
        items: 421
    },
    {
        name: 'Automotive',
        slug: 'automotive',
        items: 182
    },
    {
        name: 'Furniture & Appliances',
        slug: 'furniture-appliances',
        items: 15
    },
    {
        name: 'Music & Books',
        slug: 'music-books',
        items: 89
    },
    {
        name: 'Health & Beauty',
        slug: 'health-beauty',
        items: 201
    }
]

type MakeFn<T extends IBaseCategory = IBaseCategory> = (def: ICategoryDef) => T;

function makeShopCategory (def: ICategoryDef): IShopCategory {
    return {
        type: 'shop',
        id: getId(),
        name: def.name,
        slug: def.slug || nameToSlug(def.name),
        image: def.image,
        items: def.items || 0,
        customFields: {},
        parent: undefined,
        children: []
    }
}

function walkTree<T extends IBaseCategory = IBaseCategory> (makeFn: MakeFn<T>, defs: ICategoryDef[], parent?: T): [T[], T[]] {
    let list: T[] = []

    const tree = defs.map((def) => {
        const category: T = makeFn(def)

        const [childrenTree, childrenList] = walkTree(makeFn, def.children || [], category)

        category.parent = parent
        category.children = childrenTree
        list = [...list, category, ...childrenList]

        return category
    })

    return [tree, list]
}

export function prepareCategory<T extends IBaseCategory> (category: T, depth?: number): T {
    let children

    if (depth && depth > 0) {
        children = category.children && category.children.map(x => prepareCategory(x, depth - 1))
    }

    return JSON.parse(JSON.stringify({
        ...category,
        parent: category.parent ? prepareCategory(category.parent) : null,
        children
    }))
}

export const [categoriesTreeData, categoriesListData] = walkTree(makeShopCategory, categoriesDef)
