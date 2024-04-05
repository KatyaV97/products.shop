import {ADMIN} from "~/server/api/constants/urls"
import {H3Event} from "h3"

/**
 * Method: DELETE
 * Удаление заявки из списка
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)
    const cookie = parseCookies(event)

    try {
        return await $fetch(`${ADMIN}/deleteOrder`, {
                method: 'DELETE',
                body: {
                    task_id: params.task_id,
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
