'use client'
import ReduxProvider from "@/components/context/redux/reduxProvider";
import NavBar from "@/components/common/navbar";
import { adminRoutes, routes } from "@/components/routes";
import IndexContainer from "./container";

export default function Index() {
    return (
        <ReduxProvider>
            <div className="wrapper">
            <NavBar data={adminRoutes} />
            <IndexContainer />
            </div>
        </ReduxProvider>
    )
}