import {BASKET} from "~/server/api/constants/urls"
import {H3Event} from "h3"
import useCustomFetch from "~/server/api/helpers/customFetcher";

/**
 * Method: DELETE
 * Добавление в каорзину товара
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)

    try {
        return await useCustomFetch(`${BASKET}/deleteProduct`,
            event,
            {
                method: 'DELETE',
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