import {AUTH} from "~/server/api/constants/urls"
import {H3Event} from "h3"

/**
 * Method: POST
 * Получение ключа аутентификации по паролю
 */
export default defineEventHandler(async (event: H3Event<Request>) => {
    const params = getQuery(event)
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    console.log(11)
    try {
        return await $fetch(`${AUTH}/login`,
            {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    email: params.email,
                    password: params.password
                })
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
