"use client"

import PaginationElement from "@/components/controls/pagination";
import TableComponent, { TableData, TableDataElemInterface } from "@/components/controls/table";
import { useEffect, useMemo, useState } from "react";
import NavBar from "@/components/common/navbar";
import { routes } from "@/components/routes";
import { ClockIcon, Cross1Icon, DownloadIcon, LinkBreak1Icon, Pencil1Icon, TransformIcon, UpdateIcon } from "@radix-ui/react-icons";
import { BarChartIcon, Loader2, Search } from "lucide-react";
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
import InputIconComponent from "@/components/controls/inputs/InputIcon";
import AppTableCampaigns, { AppTableCampaignsData } from "@/components/controls/tables/app-table-campaigns";
import CampaignItem from "@/components/common/campaign-item";




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

    const mockData: AppTableCampaignsData[] = [
        {
            id: 5,
            name: 'Micha',
            page: 'google',
            status: 'active',
            last_updated: format(new Date().toString(), 'dd.MM.yyyy HH:mm'),
            passed: 654,
            total: 1000,
            link: 'ghtht'
        },
        {
            id: 5,
            name: 'Micha',
            page: 'google',
            status: 'deactivated',
            last_updated: format(new Date().toString(), 'dd.MM.yyyy HH:mm'),
            passed: 100,
            total: 1000,
            link: 'ghtht'
        },
        {
            id: 5,
            name: 'Micha',
            page: 'google',
            status: 'active',
            last_updated: format(new Date().toString(), 'dd.MM.yyyy HH:mm'),
            passed: 723,
            total: 1000,
            link: 'ghtht'
        },
        {
            id: 5,
            name: 'Micha',
            page: 'google',
            status: 'deactivated',
            last_updated: format(new Date().toString(), 'dd.MM.yyyy HH:mm'),
            passed: 437,
            total: 1000,
            link: 'ghtht'
        },
        {
            id: 5,
            name: 'Micha',
            page: 'google',
            status: 'active',
            last_updated: format(new Date().toString(), 'dd.MM.yyyy HH:mm'),
            passed: 900,
            total: 1000,
            link: 'ghtht'
        },
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
        console.log(result.data)
        if(result.data.data.campaigns) {
        setCampaigns(result.data.data.campaigns)
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
            <div className="title-page mb-10">
                <div className="text-3xl bg-card rounded-lg pt-6 pb-6 pl-5">Campaigns</div>
            </div>
            <div className="wrapper-search flex align-end justify-end mb-5">
            <div className="search flex items-center justify-start">
                <InputIconComponent icon={<Search />} type="string" placeholder="Search campaigns to id, token..." />
            </div>
            </div>
            <div className="p-5">
            <AppTableCampaigns 
            data={mockData || []} 
            itemRender={item => CampaignItem(item)}
            />
            <PaginationElement 
            onClickNext={onClickNextPage} 
            onClickPrevious={onClickPreviousPage} 
            onClick={onClickPage} 
            data={pages} 
            currentPage={page}
            />
            </div>
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