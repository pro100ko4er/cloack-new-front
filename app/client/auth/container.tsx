"use client"

import useAuthed from "@/components/context/hooks/useAuthed";
import useLogin from "@/components/context/hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
export default function AuthContainer() {

    const [token, setToken] = useState<string>('')

    const {login, isLoading, error, errors} = useLogin(token)

    const {authed, isLoading: isLoadingAuthed, error: errorAuthed, errors: errorsAuthed} = useAuthed()
useEffect(() => {
    authed()
}, [])
    return (
        <div className="container">
            <div className="form-container bg-slate-200 dark:bg-background p-7 rounded-lg m-20">
                <div className="form-title mb-3 bg-card flex items-center justify-center p-10 rounded-lg">
                    <p className="text-2xl">Authorization</p>
                </div>
                <div className="form-body flex w-max-[75%]">
                <Input type="text" onChange={e => setToken(e.currentTarget.value)} value={token} placeholder="Token" />
                <Button variant={'secondary'} disabled={isLoading} onClick={async () => await login()} className="bg-card">
                    {
                        isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        "Please wait"</> : "Log In"
                    }
                    
                    </Button>
                </div>
                <div className="result error-field">
                    {error}
                </div>
            </div>
        </div>
    )
}