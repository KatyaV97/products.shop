import {CATALOG} from "~/server/api/constants/urls"
import {H3Event} from "h3"

/**
 * Method: GET
 * Получение популярных категорий товаров
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)
    console.log(params.category_id)
    try {
        return await $fetch(`${CATALOG}/getProducts/?category_id=${params.category_id}`,
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