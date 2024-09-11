'use client'
import ReduxProvider from "@/components/context/redux/reduxProvider";
import AuthContainer from "./container";

export default function Auth() {
    return (
        <ReduxProvider>
            <div className="wrapper">
            <AuthContainer />
            </div>
        </ReduxProvider>
    )
}