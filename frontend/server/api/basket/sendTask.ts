import {BASKET} from "~/server/api/constants/urls"
import {H3Event} from "h3"
import type {ErrorBody} from "~/server/api/helpers/errorHelpers"

/**
 * Method: POST
 * Добавление заявки на товары
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)

    try {
        return await $fetch(`${BASKET}/task`,
            {
                method: 'POST',
                body: params
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