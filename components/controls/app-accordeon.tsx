

import {
    Accordion,
  } from "@/components/ui/accordion"
import { ReactNode } from "react"
  
export interface AppAccordeonProps {
  itemRender: (item: any) => ReactNode,
  data: any[]
}


export default function AppAccordeon(props: AppAccordeonProps) {
  const {itemRender, data} = props
  return (
  <Accordion type="multiple">
    {data.map(item => {
      return itemRender(item)
    })}
</Accordion>
  )
}