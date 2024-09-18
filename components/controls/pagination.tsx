import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

export interface PaginationElementProps {
    data: number[],
    currentPage: number,
    onClick: (page: number) => void,
    onClickPrevious: () => void,
    onClickNext: () => void,
}


export default function PaginationElement(props: PaginationElementProps) {
    const {data, currentPage, onClick, onClickNext, onClickPrevious} = props
    const [current, setCurrent] = useState<number>(0)
    const [filterData, setFilterData] = useState([0])
    useEffect(() => {
      setCurrent(currentPage)
      if(current - 4 > 0) {
      setFilterData(prev => prev = data.slice(current - 4, current + 4))
      }
      else {
        setFilterData(prev => prev = data.slice(0, current + 4))
      }
      setTimeout(() => {
        console.log(data.slice(current - 4, current + 4))
      }, 5000)
    }, [current, currentPage, data])
    return (
<Pagination>
  <PaginationContent>
    <PaginationItem onClick={() => currentPage >= 1 && onClickPrevious()}>
    <ChevronLeft />
    </PaginationItem>
    {
          currentPage + 1 !== data[0] && current - 4 > 0 ?
          <PaginationItem onClick={() => onClick(data[0] - 1)}>
          <PaginationLink isActive={data[0] === currentPage + 1}>{data[0]}</PaginationLink>
      </PaginationItem>
      :
      ''
        }
    {
    filterData[0] !== 1 ? 
    '...'
    : 
    ''}
        {filterData.map((item, index) => {
            return (
                <PaginationItem key={index} onClick={() => onClick(item - 1)}>
                    <PaginationLink href="#" isActive={item === currentPage + 1}>{item}</PaginationLink>
                </PaginationItem>
            )
        })}
        {data.length > 10 && currentPage + 1 !== data[data.length - 1] ? 
          <div className="spread">...</div>
          :
          ''
        }
        {
          currentPage + 1 !== data[data.length - 1] ?
          <PaginationItem onClick={() => onClick(data[data.length - 1] - 1)}>
          <PaginationLink href="#" isActive={data[data.length - 1] === currentPage + 1}>{data[data.length - 1]}</PaginationLink>
      </PaginationItem>
      :
      ''
        }
    <PaginationItem onClick={() => currentPage < data.length - 1 && onClickNext()}>
    <ChevronRight />
    </PaginationItem>
  </PaginationContent>
</Pagination>
    )
}