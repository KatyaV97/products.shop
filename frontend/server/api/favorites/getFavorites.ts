import {FAVORITES} from "~/server/api/constants/urls"
import {H3Event} from "h3"
import useCustomFetch from "~/server/api/helpers/customFetcher";

/**
 * Method: GET
 * Получение товаров из корзины
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)
    const user_id = useCookie('userId', event)

    try {
        return await useCustomFetch(`${FAVORITES}/getFavorites/${user_id}`,
            event,
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