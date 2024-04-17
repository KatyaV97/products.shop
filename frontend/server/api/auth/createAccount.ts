import {AUTH} from "~/server/api/constants/urls"
import {H3Event} from "h3"
import type {ErrorBody} from "~/server/api/helpers/errorHelpers"
/**
 * Method: POST
 * Регистрация пользователя
 */
export default defineEventHandler(async (event: H3Event) => {
    const params = getQuery(event)
/*
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');*/
    try {
        return await $fetch(`${AUTH}/register`,
            {
                method: 'POST',
                body: JSON.stringify({
                    name: params.name,
                    email: params.email,
                    password: params.password
                })
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
