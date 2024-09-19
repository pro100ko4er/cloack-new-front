import { ChartColumnDecreasing, CircleX, Download, Pen } from "lucide-react";
import { ICampaign } from "../../context/types/schemes";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import google from '../../../assets/google.png'
import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ModalConfirm } from "@/components/controls/modals/modal-confirm";
export default function CampaignItem
(
    item: ICampaign, 
    setSelected: (value: string) => any,
    selected: string,
    onClickRemoveCampaign: (id: number | string) => any
) {
    const passed = Math.floor((item.passed / item.total) * 100)
    return (
        <div className="flex items-center gap-2 mb-5 container">
                            <Checkbox 
                            className="hidden md:ml-auto md:flex" 
                            value={item.id}
                            onCheckedChange={e => e ? setSelected(item.id.toString()) : setSelected('')}
                            checked={selected === item.id.toString()}
                            />
                            <div className="campaign-info container flex flex-wrap items-center gap-2 justify-between p-2 pl-5 pr-5 rounded-lg bg-card">
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
                                    <a href={item.link} download className="flex items-center justify-center gap-2">
                                    <Download />
                                    Code
                                    </a>
                                </Button>
                                <Button 
                                className="bg-background" 
                                variant={'secondary'}
                                
                                >
                                    <a href={`/client/stats-user/${item.id}`} className="flex items-center justify-center gap-2">
                                    <ChartColumnDecreasing />
                                    Stats
                                    </a>
                                </Button>
                                <Button 
                                className="bg-background" 
                                variant={'secondary'}
                                
                                >
                                    <a href={`/client/update-campaign/${item.id}`} className="flex items-center justify-center gap-2">
                                    <Pen />
                                    Edit
                                    </a>
                                </Button>
                                <ModalConfirm 
                                title={`Delete campaign ${item.name}`}
                                description={`Delete campaign ${item.name} (ID ${item.id})? This action don't be cancel!`}
                                showDialogNameButton={
                                    
                                        <a className="flex items-center justify-center gap-2">
                                        <CircleX />
                                        Delete
                                        </a>
                                     }
                                cancelButtonName="Cancel"
                                confirmButtonName="Delete"
                                onClickCancel={() => console.log('cancel')}
                                onClickConfirm={() => onClickRemoveCampaign(item.id)}
                                />
                                    </div>
                                </div>
                            </div>
                            <div className={`${selected === item.id.toString() ? 'flex md:ml-auto md:flex' : 'hidden'} actions items-center justify-center gap-2`}>
                                <Button className="bg-card" variant={'secondary'}>
                                    <a href={item.link} download>
                                    <Download />
                                    </a>
                                </Button>
                                <Button className="bg-card" variant={'secondary'}>
                                    <a href={`/client/stats-user/${item.id}`}>
                                    <ChartColumnDecreasing />
                                    </a>
                                </Button>
                                <Button className="bg-card" variant={'secondary'}>
                                    <a href={`/client/update-campaign/${item.id}`}>
                                    <Pen />
                                    </a>
                                </Button>
                                <ModalConfirm 
                                title={`Delete campaign ${item.name}`}
                                description={`Delete campaign ${item.name} (ID ${item.id})? This action don't be cancel!`}
                                showDialogNameButton={
                                    
                                        <a className="flex items-center justify-center gap-2">
                                        <CircleX />
                                         
                                        </a>
                                     }
                                cancelButtonName="Cancel"
                                confirmButtonName="Delete"
                                onClickCancel={() => console.log('cancel')}
                                onClickConfirm={() => onClickRemoveCampaign(item.id)}
                                classNameShowDialogButton="bg-card"
                                />
                            </div>
                        </div>
    )
}