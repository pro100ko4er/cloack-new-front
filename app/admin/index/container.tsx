"use client"

import PaginationElement from "@/components/controls/pagination";
import TableComponent, { TableData } from "@/components/controls/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function IndexContainer() {
    const tableData: TableData = {
        headers: [
            {data: "ID", className: ''},
            {data: "Token", className: ''},
            {data: "Status", className: ''},
            {data: "Actions", className: ''},
        ], data: [
            [
            {data: "1", className: ''},
            {data: "fgrjgY^Hfidji6767", className: ''},
            {data: "Ban", className: ''},
            {data: <div className="flex flex-row gap-5"><Button variant={'destructive'} className="bg-red-500 fg-white">Remove</Button><Button className="bg-amber-400 text-destructive-foreground" variant={'outline'}>Ban</Button><Button className="bg-blue-500 text-destructive-foreground" variant={'outline'}>Extend token</Button></div>, className: ''},
        ],
    ]
    }

    const [page, setPage] = useState('')
    const [pages, setPages] = useState([1,2,3,4,5])

    return (
        <div className="container mt-10">
            <Card className="p-5">
             <div className="title-container mb-5">
                <h1 className="text-3xl">
                    Users
                </h1>
            </div>
            <div className="wrapper-search">
                <Input type="string" placeholder="Search users to id, token..." />
            </div>
            <TableComponent caption="Users" data={tableData} />
            <hr className="mb-3 mt-3" />
            {/* <PaginationElement data={pages} /> */}
            </Card>
        </div>
    )
}