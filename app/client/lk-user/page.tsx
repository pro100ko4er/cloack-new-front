'use client'


import ReduxProvider from "@/components/context/redux/reduxProvider";
import LkUserContainer from "./container";
export default function LkUser() {
   
    return (
         <ReduxProvider> 
            <LkUserContainer />
            </ReduxProvider>
    )
}