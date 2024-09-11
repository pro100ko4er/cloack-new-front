"use client"

import PaginationElement from "@/components/controls/pagination";
import TableComponent, { TableData, TableDataElemInterface } from "@/components/controls/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import NavBar from "@/components/common/navbar";
import { routes } from "@/components/routes";
import { ClockIcon, Cross1Icon, DownloadIcon, LinkBreak1Icon, Pencil1Icon, TransformIcon, UpdateIcon } from "@radix-ui/react-icons";
import { BarChartIcon, Loader2 } from "lucide-react";
import useAuthed from "@/components/context/hooks/useAuthed";
import { useAppSelector } from "@/components/context/redux/hooks";
import { ThemeProvider } from "@/components/common/theme-provider";
import CampaignService from "@/components/context/services/CampaignService";
import useFetch from "@/components/hooks/useFetch";
import { ICampaign } from "@/components/context/types/schemes";
import { ModalConfirm } from "@/components/controls/modal-confirm";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import pagination from "@/components/utils/pagination";
import {format} from 'date-fns'




export default function LkUserContainer() {

    const {authed, isLoading, error, errors} = useAuthed()

    useEffect(() => {
        authed()
    }, [])

    const auth = useAppSelector(state => state.authReducer)

    const headers =  [
        // {data: "ID", className: ''},
        // {data: "Token", className: ''},
        {data: <div className="flex items-center jusitfy-center gap-2"><Pencil1Icon />Name</div>, className: ''},
        {data: <div className="flex items-center jusitfy-center gap-2"><LinkBreak1Icon />Status</div>, className: ''},
        {data: <div className="flex items-center jusitfy-center gap-2"><ClockIcon />Last updated at</div>, className: ''},
        {data: <div className="flex items-center jusitfy-center gap-2"><TransformIcon />Actions</div>, className: ''},
    ]

    const [campaigns, setCampaigns] = useState<ICampaign[]>()
    const [tableData, setTableData] = useState<TableData>()
    const [page, setPage] = useState<number>(0)
    const [pages, setPages] = useState([1,2,3,4,5])
    const [limit, setLimit] = useState<number>(100)

    const removeCampaign = async (id: number) => {
        const remove = await CampaignService.RemoveCampaign(id)
        if(remove.data.status === 'ok') {
            toast({
                title: "Action success!",
                description: `Campaign ${id} deleted success!`
            })
            setCampaigns(prev => prev?.filter(c => c.id !== id))
            setTableData(prev => {
                let tempData: TableDataElemInterface[][] = []
                if(prev && tempData) {
                tempData = prev?.data.filter(d => !d.find(f => f.data === id))
                prev.data = tempData
                }
                return prev
            })
        }
        else {
            toast({
                title: `Error deleting campaign ${id}`,
                description: remove.data.error
            })
        }
    }


    const [getCampaigns, isLoadingCampaigns, errorCampaign, errorsCampaign] = useFetch(async () => {
        const result = await CampaignService.GetCampaignsForUser(page, limit)
        setCampaigns(result.data.data.campaigns)
        const tempTableData: TableData = {
            headers,
            data: []
        }
        console.log(result.data)
        if(result.data.data.campaigns) {
        result.data.data.campaigns.forEach(c => {
            const linkUpdate = `/client/update-campaign/${c.id}`
            const linkStats = `/client/stats-user/${c.id}`
            const linkDownloadCode = c.link
            tempTableData.data.push(
                [
                    // {data: c.id, className: ''},
                    // {data: c.token, className: ''},
                    {data: c.name, className: ''},
                    {data: c.status === 1 ? 'Active' : 'Deactive', className: ''},
                    {data: format(c.last_update_at, 'dd.MM.yyyy HH:mm'), className: ''},
                    {data: <div className="flex flex-row gap-5">
                        <ModalConfirm 
                        showDialogNameButton={<><Cross1Icon />Delete</>}
                        title={`Confirm action`}
                        description={`Delete campaign ${c.name}?`}
                        cancelButtonName="Discard"
                        confirmButtonName="Confirm"
                        onClickCancel={() => console.log('cancel remove campaign')}
                        onClickConfirm={async () => await removeCampaign(c.id)}
                        classNameShowDialogButton="#EB575733 destructive border-none text-destructive-foreground shadow-sm h-8 rounded-md px-3 text-xs flex gap-2"
                        />
                        <a href={linkUpdate} className="primary gap-2 flex row items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground cursor-pointer h-8 rounded-md px-3 text-xs">
                          <UpdateIcon />  Edit
                            </a>
                            <a href={linkStats} className="orange gap-2 flex row items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground cursor-pointer h-8 rounded-md px-3 text-xs">
                               <BarChartIcon /> Stats
                                </a>
                                <a href={linkDownloadCode} download className="purple gap-2 flex row items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground cursor-pointer h-8 rounded-md px-3 text-xs">
                               <DownloadIcon /> Code
                                </a>
                                </div>, className: ''},
                ]
            )
        })
        setTableData(tempTableData)
        const amountPages = pagination(result.data.data.count, limit)
        console.log(amountPages)
        setPages(Array(amountPages + 1).fill(0).map((e, i) => i + 1))
        console.log(pages)
    }
    })

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


    useEffect(() => {
        console.log(1)
        getCampaigns()
    }, [page])

    return (
        <ThemeProvider
        attribute="class"
        defaultTheme={theme.mode}
        enableSystem
        // disableTransitionOnChange
        >
        <div className="wrapper">
        <Toaster />
        <NavBar data={routes} />
        <div className="unauthorized-error error-field">{!isLoading && !auth.authorized ? "Your account subscribe is expired! Renew your subscription to do any actions on account." : ''}</div>
        <div className="container mt-10">
            <Card className="p-5">
             <div className="title-container mb-5">
                <h1 className="text-3xl">
                    Campaigns
                </h1>
            </div>
            <div className="wrapper-search">
                <Input type="string" placeholder="Search campaigns to id, token..." />
            </div>
            <TableComponent 
            caption="Campaigns" 
            data={tableData} 
            classNameRow="dark-border-table"
            isLoading={isLoadingCampaigns}
            />
            <hr className="mb-3 mt-3" />
            <PaginationElement 
            onClickNext={onClickNextPage} 
            onClickPrevious={onClickPreviousPage} 
            onClick={onClickPage} 
            data={pages} 
            currentPage={page}
            />
            </Card>
        </div>
        </div>
        </ThemeProvider>
    )
}

// export async function getServerSideProps() {
//     const res = await api.get<CampaignsResponse>(`/campaign/campaigns-for-user`)
//     const data = res.data
//     return {props: {data}}
// }