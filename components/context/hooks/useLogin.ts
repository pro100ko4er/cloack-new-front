import useFetch from "@/components/hooks/useFetch";
import AccountService from "../services/AccountService";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../redux/hooks";
import { setAuthorized } from "../redux/reducers/authReducer";

export default function useLogin(token: string) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [login, isLoading, error, errors] = useFetch(async () => {
        const result = await AccountService.Login(token)
        if(result) {
            if(result.data) {
        if(result.data.status === 'ok') {
            dispatch(setAuthorized())
            localStorage.setItem('token', token)
            router.push('/client/lk-user')
        }
    }
    }

    })
    return {login, isLoading, error, errors}
}