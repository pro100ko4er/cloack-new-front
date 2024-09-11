'use client'


import ReduxProvider from "@/components/context/redux/reduxProvider";
import AddCampaignContainer from "./container";
 

export default function AddCampaign() {
 
    return (
        <ReduxProvider>
       <AddCampaignContainer />
   </ReduxProvider>
    )
}