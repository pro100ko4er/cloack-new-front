import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminAuthContainer() {
    return (
        <div className="container flex flex-col justify-center h-75">
        <div className="form-container bg-slate-200 dark:bg-slate-800 p-7 rounded-lg m-20">
            <div className="form-title mb-3">
                <p className="text-2xl">Authorization</p>
            </div>
            <div className="form-body">
            <div className="mb-3">
            <Input type="text" placeholder="login" />
            </div>
            <div className="mb-3">
            <Input type="password" placeholder="password" />
            </div>
            <Button variant={'outline'} className="bg-emerald-300 dark:bg-green-500 mt-5">Authorization</Button>
            </div>
        </div>
    </div>
    )
}