"use client"


import PaginationElement from "@/components/controls/pagination";
import TableComponent, { TableData } from "@/components/controls/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function StatsContainer() {
    const tableData: TableData = {
        headers: [
            {data: "ID", className: ''},
            {data: "Token", className: ''},
            {data: "Campaign ID", className: ''},
            {data: "IP", className: ''},
            {data: "Country", className: ''},
            {data: "User Agent", className: ''},
            {data: "Page", className: ''},
            {data: "Referer", className: ''},
            {data: "Device", className: ''},
            {data: "OS", className: ''},
            {data: "Browser", className: ''},
            {data: "Created at", className: ''},
            {data: <Button className="bg-red-500" variant={'destructive'}>Remove</Button>, className: ''}
        ], data: [
            [
            {data: "4334", className: ''},
            {data: "5gregreg^&huJHUufvedhu", className: ''},
            {data: "545", className: ''},
            {data: "127.0.0.1", className: ''},
            {data: "USA", className: ''},
            {data: "Mozilla 7.0", className: ''},
            {data: "Black", className: ''},
            {data: "Google", className: ''},
            {data: "Desktop", className: ''},
            {data: "Windows 10.0", className: ''},
            {data: "Chrome", className: ''},
            {data: "12.08.2024", className: ''},
            {data: <Checkbox />, className: ''}
        ],
        [
            {data: "4334", className: ''},
            {data: "5gregreg^&huJHUufvedhu", className: ''},
            {data: "545", className: ''},
            {data: "127.0.0.1", className: ''},
            {data: "USA", className: ''},
            {data: "Mozilla 7.0", className: ''},
            {data: "Black", className: ''},
            {data: "Google", className: ''},
            {data: "Desktop", className: ''},
            {data: "Windows 10.0", className: ''},
            {data: "Chrome", className: ''},
            {data: "12.08.2024", className: ''},
            {data: <Checkbox />, className: ''}
        ],
        [
            {data: "4334", className: ''},
            {data: "5gregreg^&huJHUufvedhu", className: ''},
            {data: "545", className: ''},
            {data: "127.0.0.1", className: ''},
            {data: "USA", className: ''},
            {data: "Mozilla 7.0", className: ''},
            {data: "Black", className: ''},
            {data: "Google", className: ''},
            {data: "Desktop", className: ''},
            {data: "Windows 10.0", className: ''},
            {data: "Chrome", className: ''},
            {data: "12.08.2024", className: ''},
            {data: <Checkbox />, className: ''}
        ],
        [
            {data: "4334", className: ''},
            {data: "5gregreg^&huJHUufvedhu", className: ''},
            {data: "545", className: ''},
            {data: "127.0.0.1", className: ''},
            {data: "USA", className: ''},
            {data: "Mozilla 7.0", className: ''},
            {data: "Black", className: ''},
            {data: "Google", className: ''},
            {data: "Desktop", className: ''},
            {data: "Windows 10.0", className: ''},
            {data: "Chrome", className: ''},
            {data: "12.08.2024", className: ''},
            {data: <Checkbox />, className: ''}
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
                    Statistics
                </h1>
            </div>
             
            <div className="wrapper-search">
                <Input type="string" placeholder="Search stats to id, campaign id, token..." />
            </div>
            <TableComponent caption="Stats" data={tableData} />
            <hr className="mb-3 mt-3" />
            {/* <PaginationElement data={pages} /> */}
            </Card>
        </div>
    )
}