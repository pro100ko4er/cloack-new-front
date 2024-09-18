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
import InputIconComponent from "@/components/controls/inputs/InputIcon";
import { MonitorDot, Search, Smartphone, Tablet, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatsItem from "@/components/common/stats-item";
import { Accordion } from "@radix-ui/react-accordion";
import AppAccordeon from "@/components/controls/app-accordeon";
import { MultiSelect } from "react-multi-select-component";
import { SelectedProps } from "../../add-campaign/container";
import classes from './style/StatsUser.module.css'
import android from '../../../../assets/svg-photos/os-icons/android.svg'
import ios from '../../../../assets/svg-photos/os-icons/ios.svg'
import macos from '../../../../assets/svg-photos/os-icons/macos.svg'
import windows from '../../../../assets/svg-photos/os-icons/windows.svg'
import linux from '../../../../assets/svg-photos/os-icons/linux.svg'

export default function StatsUserContainer({ params }: { params: { id: string } }) {

    const {authed, isLoading, error, errors} = useAuthed()

    const id = params.id

    useEffect(() => {
        console.log(params.id)
        authed()
    }, [])

    const devices_array = [
        {value: "desktop", label: <div className="flex flex-wrap gap-2"><MonitorDot size={20} />Desktop</div>},
        {value: "mobile", label: <div className="flex flex-wrap gap-2"><Smartphone size={20} />Mobile</div>},
        {value: "tablet", label: <div className="flex flex-wrap gap-2"><Tablet size={20} />Tablet</div>},
        {value: "tv", label: <div className="flex flex-wrap gap-2"><Tv size={20} />TV</div>}
    ]

    const os_array = [
        {value: "windows", label: <div className="flex flex-wrap gap-2"><img width={20} height={20} src={windows.src} />Windows</div>},
        {value: "ios", label: <div className="flex flex-wrap gap-2"><img width={20} height={20} src={ios.src} />iOS</div>},
        {value: "android", label: <div className="flex flex-wrap gap-2"><img width={20} height={20} src={android.src} />Android</div>},
        {value: "macos", label: <div className="flex flex-wrap gap-2"><img width={20} height={20} src={macos.src} />macOS</div>},
        {value: "linux", label: <div className="flex flex-wrap gap-2"><img width={20} height={20} src={linux.src} />Linux</div>}
    ]

    const browsers_array = [
        {value: "Desktop", label: <div className="flex flex-wrap gap-2"><MonitorDot size={20} />Desktop</div>},
        {value: "Mobile", label: <div className="flex flex-wrap gap-2"><Smartphone size={20} />Mobile</div>},
        {value: "Tablet", label: <div className="flex flex-wrap gap-2"><Tablet size={20} />Tablet</div>},
        {value: "Tv", label: <div className="flex flex-wrap gap-2"><Tv size={20} />TV</div>}
    ]

    const [selectedDevices, setSelectedDevices] = useState<SelectedProps[]>([])

    const [selectedOs, setSelectedOs] = useState<SelectedProps[]>([])

    const [selectedBrowsers, setSelectedBrowsers] = useState<SelectedProps[]>([])

    const [stats, setStats] = useState<IStats[]>([
        {
            id: 1,
            token: 'grwegtehgterh',
            campaign_id: 2,
            ip: '127.0.0.1',
            country: 'Russia',
            user_agent: "Google",
            page: "Black",
            referer: "Yandex",
            device: "Android",
            os: "Android",
            browser: "Mozilla",
            created_at: format(new Date().toString(), 'dd.MM.yyyy HH:mm'),
            type_page: 'white'
        },
        {
            id: 2,
            token: 'grwegtehgterh',
            campaign_id: 2,
            ip: '127.0.0.1',
            country: 'Russia',
            user_agent: "Google",
            page: "Black",
            referer: "Yandex",
            device: "Android",
            os: "Android",
            browser: "Mozilla",
            created_at: format(new Date().toString(), 'dd.MM.yyyy HH:mm'),
            type_page: 'black'
        },
        {
            id: 3,
            token: 'grwegtehgterh',
            campaign_id: 2,
            ip: '127.0.0.1',
            country: 'Russia',
            user_agent: "Google",
            page: "Black",
            referer: "Yandex",
            device: "Android",
            os: "Android",
            browser: "Mozilla",
            created_at: format(new Date().toString(), 'dd.MM.yyyy HH:mm'),
            type_page: 'black'
        },
        {
            id: 4,
            token: 'grwegtehgterh',
            campaign_id: 2,
            ip: '127.0.0.1',
            country: 'Russia',
            user_agent: "Google",
            page: "Black",
            referer: "Yandex",
            device: "Android",
            os: "Android",
            browser: "Mozilla",
            created_at: format(new Date().toString(), 'dd.MM.yyyy HH:mm'),
            type_page: 'white'
        },
    ])
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
        if(result.data.stats) {
        // setStats(result.data.stats.stats)
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
        <div className="title-page mb-10">
                <div className="text-3xl bg-card rounded-lg pt-6 pb-6 pl-5 pr-5 success rounded-50 flex items-center justify-between">
                    Statistics of campaign ID {id}
                    <Button variant={'secondary'}>
                        Guest access
                    </Button>
                    </div>
            </div>
             
            <div className="wrapper-search flex flex-wrap align-end mb-5">
            <div className="container search flex items-center justify-between">
                <div className="container filters flex items-center flex-wrap gap-2">
                <MultiSelect 
            options={devices_array} 
            value={selectedDevices}
            onChange={setSelectedDevices}
            labelledBy="Devices"
            
            className={`${classes.rmsc_update} min-w-[200px] w-[15%]`}
            valueRenderer={(selected, _options) => {
              console.log(selected)
              return selected.length
    ? selected.map(({ value, label }) => value + ' ') : "Devices"
  ;
            }}
            filterOptions={(options, filter) => filter ? options.filter(op => op.value.toLowerCase().includes(filter.toLowerCase())) : options}
            />
                     <MultiSelect 
            options={os_array} 
            value={selectedOs}
            onChange={setSelectedOs}
            labelledBy="Devices"
            className={`${classes.rmsc_update} min-w-[200px] w-[15%]`}
            valueRenderer={(selected, _options) => {
              console.log(selected)
              return selected.length
    ? selected.map(({ value, label }) => value + ' ') : "OS"
  ;
            }}
            filterOptions={(options, filter) => filter ? options.filter(op => op.value.toLowerCase().includes(filter.toLowerCase())) : options}
            />
                     <MultiSelect 
            options={browsers_array} 
            value={selectedBrowsers}
            onChange={setSelectedBrowsers}
            labelledBy="Devices"
            className={`${classes.rmsc_update} min-w-[200px] w-[15%]`}
            valueRenderer={(selected, _options) => {
              console.log(selected)
              return selected.length
    ? selected.map(({ value, label }) => value + ' ') : "Browser"
  ;
            }}
            filterOptions={(options, filter) => filter ? options.filter(op => op.value.toLowerCase().includes(filter.toLowerCase())) : options}
            />
                </div>
                <InputIconComponent icon={<Search />} type="string" placeholder="Search stats" />
            </div>
            </div>
            <div className="container stats">
                <AppAccordeon 
                    data={stats}
                    itemRender={(item) => StatsItem(item)}
                />
            </div>
            <PaginationElement 
            onClick={onClickPage} 
            onClickNext={onClickNextPage} 
            onClickPrevious={onClickPreviousPage} 
            data={pages} 
            currentPage={page}
            />
            
        </div>
        </div>
        </ThemeProvider>
    )
}