import {BASKET} from "~/server/api/constants/urls"
import {H3Event} from "h3"
import type {ErrorBody} from "~/server/api/helpers/errorHelpers"

/**
 * Method: POST
 * Добавление в корзину товара
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)
    const cookie = parseCookies(event)
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
        if (typeof exception === 'object' &&
            exception !== null &&
            exception?.data) {
            return {
                error: true,
                code: exception.data.code,
                message: exception.data.message
            } as ErrorBody
        }
    }
})
