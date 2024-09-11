"use client"


import { DatePicker } from "@/components/controls/datepicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CreateTokenContainer() {
    const [date, setDate] = useState<Date | undefined>()
    return (
        <div className="container pt-10">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h1>Create token</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent className="form-create-token">
                    <div className="mb-5 flex">
                        <Button className="rounded-none">
                            Generate token
                        </Button>
                        <Input className="rounded-none" />
                    </div>
                    <div className="mb-5 flex">
                        <Button disabled className="rounded-none">
                            Pick a date
                        </Button>
                         <DatePicker setDate={setDate} date={date} placeholder="Pick a date expired token" />
                    </div>
                    <Button>
                        Create token
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}