'use client'
import ReduxProvider from "@/components/context/redux/reduxProvider";
import AdminAuthContainer from "./container";
import NavBar from "@/components/common/navbar";
import { adminRoutes, routes } from "@/components/routes";

export default function CreateToken() {
    return (
        <ReduxProvider>
            <div className="wrapper">
            <NavBar data={adminRoutes} />
            <AdminAuthContainer />
            </div>
        </ReduxProvider>
    )
}