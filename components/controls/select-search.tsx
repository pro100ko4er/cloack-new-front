"use client"


import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/components/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 
export interface SelectSearchData {
    label: string,
    value: string
}


export interface SelectSearchProps {
    data: SelectSearchData[]
}


export default function SelectSearch(props: SelectSearchProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const {data} = props
    return (
        <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data.find((elem) => elem.value === value)?.label
            : "Select elem..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search elem..." />
          <CommandList>
            <CommandEmpty>No elem found.</CommandEmpty>
            <CommandGroup>
              {data.map((elem, index) => (
                <CommandItem
                  key={index}
                  value={elem.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === elem.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {elem.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    )
}