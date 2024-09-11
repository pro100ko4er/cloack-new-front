import useFetch from "@/components/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../redux/hooks";
import { unsetAuthorized } from "../redux/reducers/authReducer";

export default function useLogout() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [logout, isLoading, error, errors] = useFetch(async () => {
        localStorage.removeItem('token')
        dispatch(unsetAuthorized())
        router.push('/client/auth')
    })
    return {logout, isLoading, error, errors}
}