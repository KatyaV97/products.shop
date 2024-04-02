import {FAVORITES} from "~/server/api/constants/urls"
import {H3Event} from "h3"
import useCustomFetch from "~/server/api/helpers/customFetcher";

/**
 * Method: POST
 * Добавление в избранное товара
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)
    const cookie = parseCookies(event)
    try {
        return await $fetch(`${FAVORITES}/addFavorite`, {
                headers: {
                    'Authorization': `Bearer ${cookie.access}`
                },
                method: 'POST',
                body: {
                    product_id: params.product_id,
                    user_id: params.user_id,
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