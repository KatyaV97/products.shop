import {UseFetchOptions} from 'nuxt/app'
import {AUTH} from "~/server/api/constants/urls"
import {defu} from "defu"
import {H3Event} from "h3"

/**
 * Кастомный фетчер с рефрешем jwt-токена,
 * перезаписывает токены, бесшовно перевызывает бэк,
 * для методов, которые авторизуются посредством access-токена
 */
export default function useCustomFetch<T>(url: string | (() => string),
                                          event: H3Event<Request>,
                                          _options: UseFetchOptions<T> = {}) {
    const cookies = parseCookies(event)
    let authToken: string = cookies.access
    let refreshToken: string = cookies.refresh

    const defaults: UseFetchOptions<T> = {
        retryStatusCodes: [401],
        retry: 1,
        onRequest({options}): void {
            if (authToken) {
                options.headers = {
                    ...options.headers,
                    'Authorization': `Bearer ${authToken}`
                }
            }
        },
        async onResponseError({response}): Promise<void> {
            if (response.status === 401) {
                const response = await $fetch(`${AUTH}refresh-token`, {
                    method: 'POST',
                    body: {
                        refresh_token: refreshToken,
                    }
                }).then(
                    (response) => {
                        refreshToken = response.refresh_token
                        authToken = response.access_token
                        setCookie(event, 'access', authToken)
                        setCookie(event, 'refresh', refreshToken)
                        return response.access_token
                    }
                ).catch((error) => {
                    return error
                })
            }
        }
    }
    return $fetch(url, defu(_options, defaults))
}