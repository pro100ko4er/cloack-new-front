'use client'


import ReduxProvider from "@/components/context/redux/reduxProvider";
import UpdateCampaignContainer from "./container";



export default function UpdateCampaign({ params }: { params: { id: string } }) {
     
    return (
        <ReduxProvider>
       <UpdateCampaignContainer params={params} />
    </ReduxProvider>
    )
}