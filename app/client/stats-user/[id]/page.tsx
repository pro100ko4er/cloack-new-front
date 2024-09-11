'use client'


import ReduxProvider from "@/components/context/redux/reduxProvider";
import StatsUserContainer from "./container";


export default function StatsUser({ params }: { params: { id: string } }) {
   
    return (
        <ReduxProvider>
       <StatsUserContainer params={params} />
   </ReduxProvider>
    )
}