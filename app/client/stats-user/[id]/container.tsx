"use client"


import NavBar from "@/components/common/navbar";
import { ThemeProvider } from "@/components/common/theme-provider";
import useAuthed from "@/components/context/hooks/useAuthed";
import { useAppSelector } from "@/components/context/redux/hooks";
import StatsService from "@/components/context/services/StatsService";
import { IStats } from "@/components/context/types/schemes";
import PaginationElement from "@/components/controls/pagination";
import TableComponent, { TableData } from "@/components/controls/table";
import useFetch from "@/components/hooks/useFetch";
import { routes } from "@/components/routes";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import pagination from "@/components/utils/pagination";
import { useEffect, useMemo, useState } from "react";
import {format} from 'date-fns'



export default function StatsUserContainer({ params }: { params: { id: string } }) {

    const {authed, isLoading, error, errors} = useAuthed()

    const id = params.id

    useEffect(() => {
        console.log(params.id)
        authed()
    }, [])

    const headers = [
        {data: "ID", className: ''},
        // {data: "Token", className: ''},
        {data: "Campaign ID", className: ''},
        {data: "IP", className: ''},
        {data: "Country", className: ''},
        {data: "User Agent", className: ''},
        {data: "Page", className: ''},
        {data: "Referer", className: ''},
        {data: "Device", className: ''},
        {data: "OS", className: ''},
        {data: "Browser", className: ''},
        {data: "Created at", className: ''}
    ]

    const tableData1: TableData = {
        headers, data: [
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
            {data: "12.08.2024", className: ''}
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
            {data: "12.08.2024", className: ''}
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
            {data: "12.08.2024", className: ''}
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
            {data: "12.08.2024", className: ''}
        ],
    ]
    }


    const [stats, setStats] = useState<IStats[]>()
    const [tableData, setTableData] = useState<TableData>()
    const [limit, setLimit] = useState<number>(100)
    const [page, setPage] = useState<number>(0)
    const [pages, setPages] = useState([0])
    const theme = useAppSelector(state => state.themeReducer)

    const onClickPage = (page: number) => {
        setPage(page)
        console.log(page)
    }

    const onClickPreviousPage = () => {
        setPage(page - 1)
        console.log(page)
    }

    const onClickNextPage = () => {
        setPage(page + 1)
        console.log(page)
    }

    const [getStats, isLoadingStats, errorStats, errorsStats] = useFetch(async () => {
        const result = await StatsService.GetStatsForUserCampaign(id, page, limit)
        setStats(result.data.stats.stats)
        const tempTableData: TableData = {
            headers,
            data: []
        }
        if(result.data.stats) {
        result.data.stats.stats.forEach(c => {
            tempTableData.data.push(
                [
                    {data: c.id, className: ''},
                    // {data: c.token, className: ''},
                    {data: c.campaign_id, className: ''},
                    {data: c.ip, className: ''},
                    {data: c.country, className: ''},
                    {data: c.user_agent, className: ''},
                    {data: c.page, className: ''},
                    {data: c.referer, className: ''},
                    {data: c.device, className: ''},
                    {data: c.os, className: ''},
                    {data: c.browser, className: ''},
                    {data: format(c.created_at, 'dd.MM.yyyy HH:mm'), className: ''}
                ]
            )
        })
        setTableData(tempTableData)
        const amountPages = pagination(result.data.stats.count, limit)
        console.log(amountPages)
        setPages(Array(amountPages + 1).fill(0).map((e, i) => i + 1))
        console.log(pages)
    }
    })

    useEffect(() => {
        
        getStats()
    }, [page])

    return (
        <ThemeProvider
        attribute="class"
        defaultTheme={theme.mode}
        enableSystem
        disableTransitionOnChange
        >
        <div className="wrapper">
        <NavBar data={routes} />
        <div className="container mt-10">
            <Card className="p-5">
            <div className="title-container mb-5">
                <h1 className="text-3xl">
                    Statistics of campaign ID {id}
                </h1>
            </div>
             
            <div className="wrapper-search">
                <Input type="string" placeholder="Search stats to id, campaign id, token..." />
            </div>
            <TableComponent 
            caption="Stats" 
            data={tableData} 
            isLoading={isLoadingStats}
            />
            <hr className="mb-3 mt-3" />
            <PaginationElement 
            onClick={onClickPage} 
            onClickNext={onClickNextPage} 
            onClickPrevious={onClickPreviousPage} 
            data={pages} 
            currentPage={page}
            />
            </Card>
        </div>
        </div>
        </ThemeProvider>
    )
}