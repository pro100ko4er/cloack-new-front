import useFetch from "@/components/hooks/useFetch"
import AccountService from "../services/AccountService"
import { useAppDispatch } from "../redux/hooks"
import { setAuthorized, unsetAuthorized } from "../redux/reducers/authReducer"
import { usePathname, useRouter } from "next/navigation"

export default function useAuthed() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const [authed, isLoading, error, errors] = useFetch(async () => {
        const token = localStorage.getItem('token')
        if(!token || token.length <= 0) {
            router.push('/client/auth')
            return
        }
        const res = await AccountService.Auth()
        if(res) {
            dispatch(setAuthorized())
            if(pathname.includes('auth')) {
                router.push('/client/lk-user')
            }
        }
        else {
            dispatch(unsetAuthorized())
            // router.push('/client/auth')
        }
    })
    return {authed, isLoading, error, errors}
}