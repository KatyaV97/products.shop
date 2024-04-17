import {CATALOG} from "~/server/api/constants/urls"
import {H3Event} from "h3"
import type {ErrorBody} from "~/server/api/helpers/errorHelpers"

/**
 * Method: GET
 * Получение товаров по id категории
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)

    try {
        return await $fetch(`${CATALOG}/getProducts/?category_id=${params.category_id}`,
            {
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