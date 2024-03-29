import {BASKET} from "~/server/api/constants/urls"
import {H3Event} from "h3"
import useCustomFetch from "~/server/api/helpers/customFetcher";

/**
 * Method: POST
 * Добавление заявки на товары
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)
    console.log(params)

    try {
        return await $fetch(`${BASKET}/task`,
            {
                method: 'POST',
                body: params
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