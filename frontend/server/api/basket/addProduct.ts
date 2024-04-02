import {BASKET} from "~/server/api/constants/urls"
import {H3Event} from "h3"
import useCustomFetch from "~/server/api/helpers/customFetcher";

/**
 * Method: POST
 * Добавление в корзину товара
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)
    const cookie = parseCookies(event)
    console.log(params)
    try {
        return await $fetch(`${BASKET}/addProduct`, {
                headers: {
                    'Authorization': `Bearer ${cookie.access}`
                },
                method: 'POST',
                body: {
                    product_id: params.product_id,
                    count: params.count,
                }
            }
        )
    } catch (exception) {
        return {
            error: true,
            code: exception.data.code,
            message: exception.data.message
        }
    }
})
