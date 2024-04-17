import moment from "moment/moment"
import 'moment/locale/ru'

export default defineNuxtPlugin((nuxtApp) => {
    moment.locale('ru')
    return {
        provide: {
            moment: moment
        }
    }
})