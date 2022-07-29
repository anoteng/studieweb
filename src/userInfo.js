import {reactive} from 'vue'

export const userInfo = reactive ({
    plopenr: null,
    last_name: null,
    first_name: null,
    email: null,
    accessLevel: 0,
    accessToken: null,
    set(key, value){
        this[key] = value
    }
})