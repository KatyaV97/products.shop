export type Product = {
    id: number,
    category_id : number,
    title: string,
    count: number,
    urlImg: string,
    price: number,
    popularity?: boolean
}

export type Categories = {
    id: number,
    title: string,
    isActive?: boolean
}