import api from '../http/index'
import { AccountLoginResponse, GetUserResponse } from '../types/AccountTypes'




export default class AccountService {
    static async Login(token: string) {
        const result = await api.post<AccountLoginResponse>('/user/login', {token})
        console.log(result)
        return result
    }

    static async GetUser(id: number | string) {
        const result = await api.get<GetUserResponse>(`/user/user`, {
            params: {
                id
            }
        })
        return result
    }

    static async Auth() {
        const token = localStorage.getItem('token')
        if(token) {
            const result = await api.get('/user/auth', {
                headers: {
                    'Authorization': token
                }
            })
            if(result.status === 200) {
                return true
            }
            return false
        }
        return false
    }
     
}