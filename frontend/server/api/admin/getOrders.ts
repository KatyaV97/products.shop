import {ADMIN} from "~/server/api/constants/urls"
import {H3Event} from "h3"

/**
 * Method: GET
 * Получение заявок на покупку товаров
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)

    try {
        return await $fetch(`${ADMIN}/getOrders`,
            {
                method: 'GET',
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