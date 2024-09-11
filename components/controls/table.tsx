import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ReactNode, useEffect } from "react"


export interface TableDataElemInterface {
    data: string | ReactNode,
    className: string
}

export interface TableHeaderElemInterface {
    data: string | ReactNode,
    className: string
}


export interface TableData {
    headers: TableHeaderElemInterface[],
    data: TableDataElemInterface[][]
}


export interface TableComponentProps {
    data: TableData | undefined,
    caption?: string,
    isLoading?: boolean,
    classNameRow?: string,
    classNameHeader?: string
}


export default function TableComponent(props: TableComponentProps) {
    const {data, caption, isLoading, classNameHeader, classNameRow} = props
    return (
<Table>
  {data ? 
  <>
  <TableCaption>{caption}</TableCaption>
  <TableHeader>
    <TableRow className={classNameHeader}>
      {data.headers.map((elem, index) => {
        return (
        <TableHead key={index} className={elem.className}>
            {elem.data}
        </TableHead>
        )
      })}
    </TableRow>
  </TableHeader>
  <TableBody>
      {data.data.map((row, index) => {
        return (
          <TableRow className={classNameRow} key={index}>
            {row.map((elem, index) => {
              return (
                <TableCell key={index} className={elem.className}>{elem.data}</TableCell>
              )
            })}
          </TableRow>
        )
      })}
  </TableBody>
  </>
  :
  isLoading ?
  <div className="loading">Loading...</div>
  :
  <></>
}
</Table>
    
    )
}