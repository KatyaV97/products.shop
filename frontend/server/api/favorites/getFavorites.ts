import {FAVORITES} from "~/server/api/constants/urls"
import {H3Event} from "h3"
import type {ErrorBody} from "~/server/api/helpers/errorHelpers"

/**
 * Method: GET
 * Получение товаров из избранного
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)
    const cookie = parseCookies(event)

    try {
        return await $fetch(`${FAVORITES}/getFavorites`, {
                headers: {
                    'Authorization': `Bearer ${cookie.access}`
                },
                method: 'GET',
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