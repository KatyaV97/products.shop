import {CATALOG} from "~/server/api/constants/urls"
import {H3Event} from "h3"

/**
 * Method: GET
 * Получение товаров по слову в строке поиска
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)

    try {
        return await $fetch(`${CATALOG}/getSearchProducts/?prompt=${params.searchValue}`,
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