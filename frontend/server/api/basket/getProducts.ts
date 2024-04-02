import {BASKET} from "~/server/api/constants/urls"
import {H3Event} from "h3"
import useCustomFetch from "~/server/api/helpers/customFetcher";

/**
 * Method: GET
 * Получение товаров из корзины
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const cookie =  parseCookies(event)
    console.log(cookie.access)
    try {
        return await $fetch(`${BASKET}/getProducts/`,
            {
                headers: {
                    'Authorization': `Bearer ${cookie.access}`
                },
                method: 'GET',
            },
        )
    } catch (exception) {
        return {
            error: true,
            code: exception.data.code,
            message: exception.data.message
        }
    }
})
