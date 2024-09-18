import { IStats } from "../context/types/schemes";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export interface StatsItemInterface {
    item: IStats
}

export default function StatsItem(item: IStats) {
    
    return (
        <AccordionItem style={{borderLeft: item.type_page === 'white' ? '2px solid rgb(255, 88, 66)' : '2px solid #27AE60'}} className="border-none data-[state=open]:bg-card data-[state=open]:shadow-lg data-[state=open]:rounded-lg mb-1" value={`item-${item.id}`}>
          <AccordionTrigger className="flex flex-wrap items-center pt-4 pb-4 pl-6 pr-6 text-decoration-none">
            <div className="info flex flex-wrap gap-5 items-center">
                <div className="flex items-start flex-wrap flex-col">
                    <span className="gray-text text-sm">
                        IP
                    </span>
                    {item.ip}
                </div>
                <div className="flex items-start flex-wrap flex-col">
                    <span className="gray-text text-1x">
                        Country
                    </span>
                    {item.country}
                </div>
                <div className="flex items-start flex-wrap flex-col">
                    <span className="gray-text text-1x">
                        Device
                    </span>
                    {item.device}
                </div>
                <div className="flex items-start flex-wrap flex-col">
                    <span className="gray-text text-1x">
                        OS
                    </span>
                    {item.os}
                </div>
            </div>

          </AccordionTrigger>
          <AccordionContent className="flex flex-wrap items-center justify-start pl-6 pr-6">
          <div className="mass-info flex flex-wrap gap-5 items-center justify-start">
                <div className="flex items-start flex-wrap flex-col">
                    <span className="gray-text text-1x">
                        User Agent
                    </span>
                    {item.user_agent}
                </div>
                <div className="flex items-start flex-wrap flex-col">
                    <span className="gray-text text-1x">
                        Page
                    </span>
                    {item.page}
                </div>
                <div className="flex items-start flex-wrap flex-col">
                    <span className="gray-text text-1x">
                        Browser
                    </span>
                    {item.browser}
                </div>
                <div className="flex items-start flex-wrap flex-col">
                    <span className="gray-text text-1x">
                        Referer
                    </span>
                    {item.referer}
                </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      
    )
}