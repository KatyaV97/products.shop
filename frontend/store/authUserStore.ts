import {defineStore} from "pinia"

export const useAuthUserStore = defineStore('authUserStore', {
    state: () => ({
        refreshToken: null as string | null,
        accessToken: null as string | null,
        userName: null as string | null,
        userId: null as string | null,
    }),
    getters: {
        getRefreshToken(): null | string {
            const refresh = useCookie('refresh')
            let result: string | null = this.refreshToken
            if (this.refreshToken === null && typeof refresh.value === 'string') {
                result = refresh.value
            }
            return result
        },
        getAccessToken(): null | string {
            const access = useCookie('access')
            let result: string | null = this.accessToken
            if (this.accessToken === null && typeof access.value === 'string') {
                result = access.value
            }
            return result
        },
        getUserName(): null | string {
            const userName = useCookie('userName')
            let result: string | null = this.userName
            if (this.userName === null && typeof userName.value === 'string') {
                result = userName.value
            }
            return result
        },
        getUserId(): null | string {
            const userId = useCookie('userId')
            let result: string | null = this.userId
            if (!this.userId && typeof userId.value === 'string') {
                result = userId.value
            }
            return result
        },
    },
    actions: {
        setRefreshToken(value: null | string): void {
            const refresh = useCookie('refresh')
            this.refreshToken = value
            refresh.value = value
        },
        setAccessToken(value: null | string): void {
            const access = useCookie('access')
            this.accessToken = value
            access.value = value
        },
        setUserName(value: string): void {
            const access = useCookie('userName')
            this.userName = value
            access.value = value
        },
        setUserId(value: string): void  {
            const access = useCookie('userId')
            this.userId = value
            access.value = value
        },
        logOut() {
            const refresh = useCookie('refresh')
            const access = useCookie('access')
            const userName = useCookie('userName')
            const userId = useCookie('userId')
            this.refreshToken = null
            this.accessToken = null
            this.userName = null
            this.userId = null
            refresh.value = null
            access.value = null
            userName.value = null
            userId.value = null
        }
    }
})