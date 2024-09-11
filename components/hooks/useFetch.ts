import { AxiosError } from 'axios'
import {useState} from 'react'

export default function useFetch<T>(callback: () => Promise<T | undefined>): [callback: () => Promise<T | undefined>, isLoading: boolean, error: string, errors: any] {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [error, setError] = useState('')

    const [errors, setErrors] = useState([])

    async function fetching(): Promise<T | undefined> {
        try {
            setIsLoading(true)
            const data = await callback()
            return data
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError) {
                console.log(error.response)
                setError(error.response?.data.message)
            if(error.response?.data.errors) {
                setErrors(error.response?.data.errors)
            }
            }
            else if(error instanceof Error) {
                setError("Internal server error")
            }
        }
        finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error, errors]
}