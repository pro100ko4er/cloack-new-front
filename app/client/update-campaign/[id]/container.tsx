'use client'

import NavBar from "@/components/common/navbar";
import { ThemeProvider } from "@/components/common/theme-provider";
import useAuthed from "@/components/context/hooks/useAuthed";
import { useAppSelector } from "@/components/context/redux/hooks";
import InputComponent from "@/components/controls/input";
import { routes } from "@/components/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useMemo, useState } from "react";
import { checkNumberInput, SelectedProps } from "../../add-campaign/container";
import useFetch from "@/components/hooks/useFetch";
import CampaignService from "@/components/context/services/CampaignService";
import { MultiSelect } from "react-multi-select-component";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import classes from './style/UpdateCampaign.module.css'
import { toast } from "@/hooks/use-toast";
import { ICampaignBody, ICampaignUpdateBody } from "@/components/context/types/schemes";


export default function UpdateCampaignContainer({ params }: { params: { id: string } }) {

  const id = Number(params.id)

  const {authed, isLoading, error, errors} = useAuthed()

  useEffect(() => {
      authed()
  }, [])
    const auth = useAppSelector(state => state.authReducer)

    const countries = {"AF":"Afghanistan","AX":"\u00c5land Islands","AL":"Albania","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AQ":"Antarctica","AG":"Antigua & Barbuda","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia","BA":"Bosnia & Herzegovina","BW":"Botswana","BV":"Bouvet Island","BR":"Brazil","IO":"British Indian Ocean Territory","VG":"British Virgin Islands","BN":"Brunei","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","CV":"Cape Verde","BQ":"Caribbean Netherlands","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","CL":"Chile","CN":"China","CX":"Christmas Island","CC":"Cocos (Keeling) Islands","CO":"Colombia","KM":"Comoros","CG":"Congo - Brazzaville","CD":"Congo - Kinshasa","CK":"Cook Islands","CR":"Costa Rica","CI":"C\u00f4te d\u2019Ivoire","HR":"Croatia","CU":"Cuba","CW":"Cura\u00e7ao","CY":"Cyprus","CZ":"Czechia","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","SZ":"Eswatini","ET":"Ethiopia","FK":"Falkland Islands","FO":"Faroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","PF":"French Polynesia","TF":"French Southern Territories","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GG":"Guernsey","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HM":"Heard & McDonald Islands","HN":"Honduras","HK":"Hong Kong SAR China","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran","IQ":"Iraq","IE":"Ireland","IM":"Isle of Man","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JE":"Jersey","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Laos","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macao SAR China","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia","MD":"Moldova","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar (Burma)","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NF":"Norfolk Island","KP":"North Korea","MK":"North Macedonia","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestinian Territories","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PN":"Pitcairn Islands","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RE":"R\u00e9union","RO":"Romania","RU":"Russia","RW":"Rwanda","WS":"Samoa","SM":"San Marino","ST":"S\u00e3o Tom\u00e9 & Pr\u00edncipe","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SX":"Sint Maarten","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","GS":"South Georgia & South Sandwich Islands","KR":"South Korea","SS":"South Sudan","ES":"Spain","LK":"Sri Lanka","BL":"St. Barth\u00e9lemy","SH":"St. Helena","KN":"St. Kitts & Nevis","LC":"St. Lucia","MF":"St. Martin","PM":"St. Pierre & Miquelon","VC":"St. Vincent & Grenadines","SD":"Sudan","SR":"Suriname","SJ":"Svalbard & Jan Mayen","SE":"Sweden","CH":"Switzerland","SY":"Syria","TW":"Taiwan","TJ":"Tajikistan","TZ":"Tanzania","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad & Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks & Caicos Islands","TV":"Tuvalu","UM":"U.S. Outlying Islands","VI":"U.S. Virgin Islands","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VA":"Vatican City","VE":"Venezuela","VN":"Vietnam","WF":"Wallis & Futuna","EH":"Western Sahara","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"}


const countries_array: SelectedProps[] = []

const devices_array = [
    {value: "Desktop", label: "Desktop"},
    {value: "Mobile", label: "Mobile"},
    {value: "Tablet", label: "Tablet"},
    {value: "Tv", label: "Tv"}
]


let countriesTemp = Object.entries(countries)

console.log(countriesTemp)

for(let i in countriesTemp) {
    countries_array.push({value: countriesTemp[i][0], label: countriesTemp[i][1]})
}

console.log(countries_array)

const router = useRouter()

// MAY BE
const referers_array = []
const theme = useAppSelector(state => state.themeReducer)

const [name, setName] = useState<string>('')

const [whitePage, setWhitePage] = useState<string>('')

const [blackPage, setBlackPage] = useState<string>('')

const [status, setStatus] = useState<string>('')

const [vpnProxy, setVpnProxy] = useState<boolean>(false)

const [ipv6, setIpv6] = useState<boolean>(false)

const [maximumClicksByIp, setMaximumClicksByIp] = useState<boolean>(false)

const [numberMaximumClicksByIp, setNumberMaximumClicksByIp] = useState<number>(0)

const [allowGeoFilter, setAllowGeoFilter] = useState<boolean | CheckedState>(false)

const [allowDeviceFilter, setAllowDeviceFilter] = useState<boolean | CheckedState>(false)

const [allowRefererFilter, setAllowRefererFilter] = useState<boolean | CheckedState>(false)

const [selectedCountries, setSelectedCountries] = useState<SelectedProps[]>([])

const [selectedDevices, setSelectedDevices] = useState<SelectedProps[]>([])

const [referers, setReferers] = useState<string>('')

const [filterEmptyReferer, setFilterEmptyReferer] = useState<boolean | CheckedState>(false)


const [errorName, setErrorName] = useState<string>('')
const [errorBlackPage, setErrorBlackPage] = useState<string>('')
const [errorWhitePage, setErrorWhitePage] = useState<string>('')
const [errorStatus, setErrorStatus] = useState<string>('')
const [errorCountClicks, setErrorCountClicks] = useState<string>('')

const validationForm = () => {
  let valid = true
  if(name.length <= 0) {
    setErrorName("Field name don't be empty!")
    valid = false
    setTimeout(() => {
      setErrorName("")
    }, 3000)
  }
  if(blackPage.length <= 0) {
    setErrorBlackPage("Field black page don't be empty!")
    valid = false
    setTimeout(() => {
      setErrorBlackPage("")
    }, 3000)
  }
  if(whitePage.length <= 0) {
    setErrorWhitePage("Field white page don't be empty!")
    valid = false
    setTimeout(() => {
      setErrorWhitePage("")
    }, 3000)
  }
  if(status.length <= 0) {
    setErrorStatus("Field status don't be empty!")
    valid = false
    setTimeout(() => {
      setErrorStatus("")
    }, 3000)
  }
  if(numberMaximumClicksByIp <= 0 && maximumClicksByIp) {
    setErrorCountClicks("Field count don't be empty!")
    valid = false
    setTimeout(() => {
      setErrorCountClicks("")
    }, 3000)
  }
  return valid
}

  const [getCampaign, isLoadingCampaign, errorCampaign, errorsCampaign] = useFetch(async () => {
    const result = await CampaignService.GetCampaign(id)
    console.log(result)
    if(result) {
      if(result.data) {
        if(result.data.status === 'ok') {
          const data = result.data.data
          setName(data.name)
          setWhitePage(data.white_page)
          setBlackPage(data.black_page)
          setStatus(data.status ? '1' : '0')
          setVpnProxy(data.vpn ? true : false)
          setIpv6(data.ipv6 ? true : false)
          setMaximumClicksByIp(data.maximum_clicks_by_ip ? true : false)
          setNumberMaximumClicksByIp(data.number_maximum_clicks_by_ip)
          setAllowDeviceFilter(data.device ? true : false)
          setAllowGeoFilter(data.geo ? true : false)
          setAllowRefererFilter(data.referer ? true : false)
          setReferers(data.referer_referers)
          setFilterEmptyReferer(data.filter_empty_referer ? true : false)
          const geo_countries_array = data.geo_countries.split(',')
          
          const tempCountries = []
          for(let i = 0; i < geo_countries_array.length; i++) {
            for(let j = 0; j < countries_array.length; j++) {
              if(geo_countries_array[i] === countries_array[j].value) {
                tempCountries.push(countries_array[j])
              }
          }
        }
        setSelectedCountries(tempCountries)

        const device_devices_array = data.device_devices.split(',')

        const tempDevices = []
          for(let i = 0; i < device_devices_array.length; i++) {
            for(let j = 0; j < devices_array.length; j++) {
              if(device_devices_array[i] === devices_array[j].value) {
                tempDevices.push(devices_array[j])
              }
          }
        }
        setSelectedDevices(tempDevices)

        }
      }
    }

  })


  const [addCampaign, isLoadingAddCampaign, errorAddCampaign, errorsAddCampaign] = useFetch(async () => {
    const selectedCountries1 = []
    const selectedDevices1 = []
    for(let i in selectedCountries) {
      selectedCountries1.push(selectedCountries[i].value)
    }
    for(let i in selectedDevices) {
      selectedDevices1.push(selectedDevices[i].value)
    }

      const addCampaignBody: ICampaignUpdateBody = {
        id,
        name,
        white_page: whitePage,
        black_page: blackPage,
        vpn: vpnProxy,
        ipv6: ipv6,
        maximum_clicks_by_ip: maximumClicksByIp,
        number_maximum_clicks_by_ip: numberMaximumClicksByIp,
        geo: allowGeoFilter,
        device: allowDeviceFilter,
        referer: allowRefererFilter,
        geo_countries: selectedCountries1.join(','),
        device_devices: selectedDevices1.join(','),
        referer_referers: referers,
        filter_empty_referer: filterEmptyReferer,
        status: status === '1' ? true : false,
      }
      console.log(addCampaignBody)
      const create = await CampaignService.UpdateCampaign(addCampaignBody)
      if(create.data.status == 'ok') {
        toast({
          title: "Action completed",
          description: "Update campaign success!"
        })
        setTimeout(() => {
          router.push('/client/lk-user')
        }, 3000)     
      }
      else {
        toast({
          variant: 'destructive',
          title: "Error",
          description: create.data.error
        })
      }
  })

    const createCampaign = async () => {
      if(validationForm()) {
        await addCampaign()
      }
    }


  const leavePage = () => {
    router.push('/client/lk-user')
  }

  useEffect(() => {
    getCampaign()
  }, [])

  useMemo(() => {
    console.log(selectedCountries)
  }, [selectedCountries])

    return (
      <ThemeProvider
      attribute="class"
      defaultTheme={theme.mode}
      enableSystem
      disableTransitionOnChange
      >
      <div className="wrapper">
        <NavBar data={routes} />
        <div className="unauthorized-error error-field">{!auth.authorized && "Your account subscribe is expired! Renew your subscription to do any actions on account."}</div>
        <Toaster />
       <div className="container mt-10 mb-10">
        <div className="header flex gap-4 mb-5">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Campaign controller
        </h1>
        <div className="hidden items-center md:ml-auto md:flex gap-3">
                <Button onClick={() => leavePage()} variant="outline" className="bg-red-500" size="sm">
                  Discard
                </Button>
                <Button onClick={async () => await createCampaign()} variant={'outline'} className="bg-green-500" size="sm">Save campaign</Button>
              </div>
        </div>
        <div className="form-container grid md:grid-cols-[1fr_300px] gap-2 items-start">

        <Card className="form-filters border p-3">
            <CardHeader>
            <CardTitle className="title-container container text-2xl mb-5">Filters campaign</CardTitle>
            </CardHeader>
            <div className="container flex flex-wrap gap-20 items-start">


            <div className="first-container">
            <div className="input-container mb-10 flex items-center gap-3"> 
            <Switch 
            onCheckedChange={checked => setVpnProxy(checked)} 
            id="vpn/proxy" 
            checked={vpnProxy} 
            className={vpnProxy ? 'switcher-checked' : ''}
            />
            <Label htmlFor="vpn/proxy">VPN/Proxy</Label>
            </div>
            <div className="input-container mb-10 flex items-center gap-3"> 
            <Switch 
            onCheckedChange={checked => setIpv6(checked)} 
            id="ipv6" 
            checked={ipv6} 
            className={ipv6 ? 'switcher-checked' : ''}
            />
            <Label htmlFor="ipv6">IPV6</Label>
            </div>
            <div className="input-container mb-10 flex items-center gap-3"> 
            <Switch 
            onCheckedChange={checked => setMaximumClicksByIp(checked)} 
            checked={maximumClicksByIp} 
            id="maximum-clicks-by-ip" 
            className={maximumClicksByIp ? 'switcher-checked' : ''}
            />
            <Label htmlFor="maximum-clicks-by-ip">Maximum clicks by ip</Label>
            </div>
            <div className="input-container mb-5"> 
            <InputComponent disabled={maximumClicksByIp ? false : true} value={numberMaximumClicksByIp} onChange={e => checkNumberInput(e.currentTarget.value) && setNumberMaximumClicksByIp(Number(e.currentTarget.value))} label="Count clicks by ip" placeholder="Count" />
            <span className="error-field error-name-field">
                {errorCountClicks}
            </span>
            </div>
            </div>

            <div className="second-container w-[65%]">
            <div className="input-container mb-5"> 
            <div className="checkbox-container mb-3 flex items-center gap-3">
            <Checkbox onCheckedChange={checked => setAllowGeoFilter(checked)} checked={allowGeoFilter} id="allow-geo-filter" />
            <Label htmlFor="allow-geo-filter">Allow geo filter</Label>
            </div>
            <div className="container-select-search">
            <MultiSelect
            options={countries_array} 
            value={selectedCountries}
            onChange={setSelectedCountries}
            labelledBy="Countries"
            className={`${theme.mode === 'Dark' ? classes.rmsc_update : ''}`}
            
            />
            </div>
            </div>
            <div className="input-container mb-5"> 
            <div className="checkbox-container mb-3 flex items-center gap-3">
            <Checkbox onCheckedChange={checked => setAllowDeviceFilter(checked)} checked={allowDeviceFilter} id="allow-device-filter" />
            <Label htmlFor="allow-device-filter">Allow device filter</Label>
            </div>
            <div className="container-select-search"> 
            <MultiSelect 
            options={devices_array} 
            value={selectedDevices}
            onChange={setSelectedDevices}
            labelledBy="Devices"
            className={`${theme.mode === 'Dark' ? classes.rmsc_update : ''}`}
            
            />
            </div>
            </div>
            <div className="input-container mb-5"> 
            <div className="checkbox-container mb-3 flex items-center gap-3">
            <Checkbox onCheckedChange={checked => setAllowRefererFilter(checked)} checked={allowRefererFilter} id="allow-referer-filter" />
            <Label htmlFor="allow-referer-filter">Allow referer filter</Label>
            </div>
            <div className="container-textarea">
            <Textarea value={referers} onChange={e => setReferers(e.currentTarget.value)} placeholder="Enter referers separated by commas" />
            </div>
            </div>
            <div className="input-container mb-5 flex items-center gap-3"> 
            <Checkbox onCheckedChange={checked => setFilterEmptyReferer(checked)} checked={filterEmptyReferer} id="filter-empty-referer" />
            <Label htmlFor="filter-empty-referer">Filter empty referer</Label>
            </div>
            </div>

            </div>
            </Card>

        <Card className="form-pages p-3">
            <CardHeader>
            <CardTitle className="title-container text-2xl mb-5">Pages of campaign</CardTitle>
            </CardHeader>
            <div className="container flex items-center justify-center flex-wrap">
            <div className="first-container">
            <div className="input-container mb-5"> 
            <InputComponent value={name} onChange={e => setName(e.currentTarget.value)} label="Name" placeholder="Name" />
            <div className="error-field error-name-field">
                {errorName}
            </div>
            </div>
            <div className="input-container mb-5"> 
            <InputComponent value={blackPage} onChange={e => setBlackPage(e.currentTarget.value)} label="Black page" placeholder="Black page" />
            <div className="error-field error-name-field">
                {errorBlackPage}
            </div>
            </div>
            <div className="input-container mb-5"> 
            <InputComponent value={whitePage} onChange={e => setWhitePage(e.currentTarget.value)} label="White page" placeholder="White page" />
            <div className="error-field error-name-field">
                {errorWhitePage}
            </div>
            </div>
            </div>
            </div>
            <Card className="form-status mt-10 border-none p-3">
            <CardHeader>
            <CardTitle className="title-container text-2xl mb-5">Status campaign</CardTitle>
            </CardHeader>
            <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={e => setStatus(e)}>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Deactivated</SelectItem>
                            <SelectItem value="1">Active</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="error-field error-name-field">
                {errorStatus}
            </div>
                      </div>
                    </div>
                  </CardContent>
            </Card>
            </Card>
             

        </div>
        <div className="flex items-center justify-center gap-2 md:hidden mt-5">
              <Button onClick={() => leavePage()} variant="outline" className="bg-red-500" size="sm">
                Discard
              </Button>
              <Button onClick={async () => await createCampaign()} variant={'outline'} className="bg-green-500" size="sm">Save campaign</Button>
            </div>
       </div>
       </div>
       </ThemeProvider>
    )
}