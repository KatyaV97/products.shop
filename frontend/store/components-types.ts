export type BasketData = {
    id: string,
    isTariff: boolean,
    title: string,
    priceDetails: {
        price: number,
        per: string,
        anotherDetails: string
    }
}
