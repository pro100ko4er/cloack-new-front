import { ChartColumnDecreasing, CircleX, Download, Pen } from "lucide-react";
import { ICampaign } from "../context/types/schemes";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import google from '../../assets/google.png'
import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
export default function CampaignItem(item: ICampaign) {
    const passed = Math.floor((item.passed / item.total) * 100)
    const [selected, setSelected] = useState<boolean | CheckedState>(false)
    return (
        <div className="flex items-center gap-2 mb-5 container">
                            <Checkbox 
                            className="hidden md:ml-auto md:flex" 
                            value={item.id}
                            onCheckedChange={e => setSelected(e)}
                            />
                            <div className="campaign-info container flex flex-wrap items-center gap-2 justify-between p-5 rounded-lg bg-card">
                                <div className="name flex flex-col items-start gap-1">
                                    <span className="md:hidden gray-text">Name</span>
                                    {item.name}
                                </div>
                                <div className="other-info flex  items-center flex-wrap justify-between gap-10">
                                    <div className="flex  items-center gap-5">
                                        <div className="page flex flex-col items-start gap-1">
                                        <span className="md:hidden gray-text">Page</span>
                                        <img width={32} height={32} src={google.src} />
                                        </div>
                                        <div className="status flex flex-col items-start gap-1">
                                        <span className="md:hidden gray-text">Status</span>
                                            <Button className="w-[100%] min-w-[200px]" variant={item.status >= 1 ? 'success' : 'customDestructive'}>
                                                {item.status >= 1 ? "Active" : "Deactivated"}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="last-updated-passed flex items-center justify-center gap-5">
                                        <div className="last-updated flex flex-col items-start gap-1">
                                        <span className="md:hidden gray-text">Last updated</span>
                                            {item.last_update_at}
                                        </div>
                                        <div className="passed flex  flex-col font-medium items-center justify-center">
                                        <span className="md:hidden gray-text">Pass</span>
                                            <SemiCircleProgressBar 
                                            diameter={70} 
                                            strokeWidth={3} 
                                            percentage={passed} 
                                            showPercentValue 
                                            stroke={passed >= 50 ? '#27AE60' : '#E64800'}
                                            />
                                            <span>passed</span>
                                        </div>
                                    </div>
                                    <div className="actions-md flex md:hidden items-center flex-wrap gap-3">
                                    <Button className="bg-background" variant={'secondary'}>
                                    <a className="flex items-center justify-center gap-2">
                                    <Download />
                                    Code
                                    </a>
                                </Button>
                                <Button className="bg-background" variant={'secondary'}>
                                    <a className="flex items-center justify-center gap-2">
                                    <ChartColumnDecreasing />
                                    Stats
                                    </a>
                                </Button>
                                <Button className="bg-background" variant={'secondary'}>
                                    <a className="flex items-center justify-center gap-2">
                                    <Pen />
                                    Edit
                                    </a>
                                </Button>
                                <Button className="bg-background" variant={'secondary'}>
                                    <a className="flex items-center justify-center gap-2">
                                    <CircleX />
                                    Delete
                                    </a>
                                </Button>
                                    </div>
                                </div>
                            </div>
                            <div className={`${selected ? 'flex md:ml-auto md:flex' : 'hidden'} actions items-center justify-center gap-2`}>
                                <Button className="bg-card" variant={'secondary'}>
                                    <a>
                                    <Download />
                                    </a>
                                </Button>
                                <Button className="bg-card" variant={'secondary'}>
                                    <a>
                                    <ChartColumnDecreasing />
                                    </a>
                                </Button>
                                <Button className="bg-card" variant={'secondary'}>
                                    <a>
                                    <Pen />
                                    </a>
                                </Button>
                                <Button className="bg-card" variant={'secondary'}>
                                    <a>
                                    <CircleX />
                                    </a>
                                </Button>
                            </div>
                        </div>
    )
}