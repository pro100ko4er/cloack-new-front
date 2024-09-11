'use client'
import ReduxProvider from "@/components/context/redux/reduxProvider";
import AdminAuthContainer from "./container";
import NavBar from "@/components/common/navbar";
import { routes } from "@/components/routes";

export default function AdminAuth() {
    return (
        <ReduxProvider>
            <div className="wrapper">
            <NavBar data={routes} />
            <AdminAuthContainer />
            </div>
        </ReduxProvider>
    )
}