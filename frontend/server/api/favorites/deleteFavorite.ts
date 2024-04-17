import {H3Event} from "h3"
import {FAVORITES} from "~/server/api/constants/urls"
import {ErrorBody} from "~/server/api/helpers/errorHelpers"

/**
 * Method: DELETE
 * Добавление в избранное товара
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)
    const cookie = parseCookies(event)

    try {
        return await $fetch(`${FAVORITES}/deleteFavorite`, {
                headers: {
                    'Authorization': `Bearer ${cookie.access}`
                },
                method: 'DELETE',
                body: {
                    product_id: params.product_id,
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
