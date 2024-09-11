'use client'
import ReduxProvider from "@/components/context/redux/reduxProvider";
import NavBar from "@/components/common/navbar";
import { adminRoutes, } from "@/components/routes";
import StatsContainer from "./container";

export default function Stats() {
    return (
        <ReduxProvider>
            <div className="wrapper">
            <NavBar data={adminRoutes} />
            <StatsContainer />
            </div>
        </ReduxProvider>
    )
}