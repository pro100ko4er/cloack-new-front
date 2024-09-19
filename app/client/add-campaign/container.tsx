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
import { useEffect, useMemo, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import classes from './style/AddCampaign.module.css'
import { CheckedState } from "@radix-ui/react-checkbox";
import { useRouter } from "next/navigation";
import useFetch from "@/components/hooks/useFetch";
import CampaignService from "@/components/context/services/CampaignService";
import { ICampaignBody } from "@/components/context/types/schemes";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Check, ClipboardX, Info, MonitorDot, Save, ShieldCheck, ShieldMinus, Smartphone, Tablet, Tv, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import facebook from '../../../assets/facebook.png'
import google from '../../../assets/google.png'
import tiktok from '../../../assets/tiktok.png'
import reddit from '../../../assets/reddit.png'
import youtube from '../../../assets/youtube.png'
import { ModalInfo } from "@/components/controls/modals/modal-info";
export interface SelectedProps {
  label: string,
  value: string
}


export function isDigitsOnlyString(value: string) {
  return /^\d+$/.test(value);
}


export function checkNumberInput(value: string) {
  return isDigitsOnlyString(value) || value.trim() === ''
   
}

export default function AddCampaignContainer() {

  const {authed, isLoading, error, errors} = useAuthed()

  useEffect(() => {
      authed()
  }, [])

    const countries = {"AF":"Afghanistan","AX":"\u00c5land Islands","AL":"Albania","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AQ":"Antarctica","AG":"Antigua & Barbuda","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia","BA":"Bosnia & Herzegovina","BW":"Botswana","BV":"Bouvet Island","BR":"Brazil","IO":"British Indian Ocean Territory","VG":"British Virgin Islands","BN":"Brunei","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","CV":"Cape Verde","BQ":"Caribbean Netherlands","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","CL":"Chile","CN":"China","CX":"Christmas Island","CC":"Cocos (Keeling) Islands","CO":"Colombia","KM":"Comoros","CG":"Congo - Brazzaville","CD":"Congo - Kinshasa","CK":"Cook Islands","CR":"Costa Rica","CI":"C\u00f4te d\u2019Ivoire","HR":"Croatia","CU":"Cuba","CW":"Cura\u00e7ao","CY":"Cyprus","CZ":"Czechia","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","SZ":"Eswatini","ET":"Ethiopia","FK":"Falkland Islands","FO":"Faroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","PF":"French Polynesia","TF":"French Southern Territories","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GG":"Guernsey","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HM":"Heard & McDonald Islands","HN":"Honduras","HK":"Hong Kong SAR China","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran","IQ":"Iraq","IE":"Ireland","IM":"Isle of Man","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JE":"Jersey","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Laos","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macao SAR China","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia","MD":"Moldova","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar (Burma)","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NF":"Norfolk Island","KP":"North Korea","MK":"North Macedonia","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestinian Territories","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PN":"Pitcairn Islands","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RE":"R\u00e9union","RO":"Romania","RU":"Russia","RW":"Rwanda","WS":"Samoa","SM":"San Marino","ST":"S\u00e3o Tom\u00e9 & Pr\u00edncipe","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SX":"Sint Maarten","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","GS":"South Georgia & South Sandwich Islands","KR":"South Korea","SS":"South Sudan","ES":"Spain","LK":"Sri Lanka","BL":"St. Barth\u00e9lemy","SH":"St. Helena","KN":"St. Kitts & Nevis","LC":"St. Lucia","MF":"St. Martin","PM":"St. Pierre & Miquelon","VC":"St. Vincent & Grenadines","SD":"Sudan","SR":"Suriname","SJ":"Svalbard & Jan Mayen","SE":"Sweden","CH":"Switzerland","SY":"Syria","TW":"Taiwan","TJ":"Tajikistan","TZ":"Tanzania","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad & Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks & Caicos Islands","TV":"Tuvalu","UM":"U.S. Outlying Islands","VI":"U.S. Virgin Islands","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VA":"Vatican City","VE":"Venezuela","VN":"Vietnam","WF":"Wallis & Futuna","EH":"Western Sahara","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"}


const countries_array = []

const devices_array = [
    {value: "Desktop", label: <div className="flex flex-wrap gap-2"><MonitorDot size={20} />Desktop</div>},
    {value: "Mobile", label: <div className="flex flex-wrap gap-2"><Smartphone size={20} />Mobile</div>},
    {value: "Tablet", label: <div className="flex flex-wrap gap-2"><Tablet size={20} />Tablet</div>},
    {value: "Tv", label: <div className="flex flex-wrap gap-2"><Tv size={20} />TV</div>}
]

let countriesTemp = Object.entries(countries)

// console.log(countriesTemp)

for(let i in countriesTemp) {
    countries_array.push({value: countriesTemp[i][0], label: <div className="flex flex-wrap row gap-2 items-center justify-center">
      <img
      src={`https://flagcdn.com/16x12/${countriesTemp[i][0].toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/32x24/${countriesTemp[i][0].toLowerCase()}.png 2x, https://flagcdn.com/48x36/${countriesTemp[i][0].toLowerCase()}.png 3x`}
      width="16"
      height="12"
      alt={countriesTemp[i][1]} />
      {countriesTemp[i][1]}
      </div>})
}


const theme = useAppSelector(state => state.themeReducer)
 


  const [name, setName] = useState<string>('')

  const [whitePage, setWhitePage] = useState<string>('')

  const [typeLoadWhitePage, setTypeLoadWhitePage] = useState<string>('')

  const [blackPage, setBlackPage] = useState<string>('')

  const [typeLoadBlackPage, setTypeLoadBlackPage] = useState<string>('')

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

  const [addCampaign, isLoadingAddCampaign, errorAddCampaign, errorsAddCampaign] = useFetch(async () => {
    const selectedCountries1 = []
    const selectedDevices1 = []
    for(let i in selectedCountries) {
      selectedCountries1.push(selectedCountries[i].value)
    }
    for(let i in selectedDevices) {
      selectedDevices1.push(selectedDevices[i].value)
    }

      const addCampaignBody: ICampaignBody = {
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
        type_load_black_page: typeLoadBlackPage,
        type_load_white_page: typeLoadWhitePage,
        true_safe: typeLoadWhitePage === 'true_safe' ? true : false
      }
      // console.log(addCampaignBody)
      const create = await CampaignService.AddCampaign(addCampaignBody)
      if(create.data.status == 'ok') {
        toast({
          title: "Action completed",
          description: "Campaign created success!"
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

    const router = useRouter()

    const leavePage = () => {
      router.push('/client/lk-user')
    }

    useMemo(() => {
      console.log(typeLoadWhitePage)
    }, [typeLoadWhitePage])

    return (
      <ThemeProvider
      attribute="class"
      defaultTheme={'dark'}
      enableSystem
      disableTransitionOnChange
      >
      <div className="wrapper">
        <NavBar data={routes} />
        <Toaster />
       <div className="container mt-10 mb-10">
        <div className="header gap-4 mb-5">
        <div className="title-page mb-10">
                <div className="text-3xl bg-card rounded-lg pt-6 pb-6 pl-5">Campaign controller</div>
            </div>
        </div>
        <div className="form-container flex flex-wrap md:flex-nowrap">

        <div className="form-filters p-3 mb-10">
            <CardHeader className="p-0 pt-6">
            <CardTitle className="title-container container text-2xl mb-5">Filters campaign</CardTitle>
            </CardHeader>
            <div className="container flex flex-wrap gap-5 items-start">


            <div className="first-container">
            <div className="switchers flex flex-wrap gap-5">
            <div className="input-container mb-10 flex items-center gap-3"> 
            <Switch 
            onCheckedChange={checked => setVpnProxy(checked)} 
            id="vpn/proxy" 
            className={vpnProxy ? 'switcher-checked' : ''}
            />
            <Label htmlFor="vpn/proxy">VPN/Proxy</Label>
            </div>
            <div className="input-container mb-10 flex items-center gap-3"> 
            <Switch 
            onCheckedChange={checked => setIpv6(checked)} 
            id="ipv6" 
            className={ipv6 ? 'switcher-checked' : ''}
            />
            <Label htmlFor="ipv6">IPV6</Label>
            </div>
            <div className="input-container mb-10 flex items-center gap-3"> 
            <Switch 
            onCheckedChange={checked => setMaximumClicksByIp(checked)} 
            id="maximum-clicks-by-ip" 
            className={maximumClicksByIp ? 'switcher-checked' : ''}
            />
            <Label htmlFor="maximum-clicks-by-ip">Maximum clicks from one IP</Label>
            </div>
            <div className="input-container mb-10 flex items-center gap-3"> 
            <Switch 
            onCheckedChange={checked => setFilterEmptyReferer(checked)} 
            id="filter-empty-referer" 
            className={filterEmptyReferer ? 'switcher-checked' : ''}
            />
            <Label htmlFor="filter-empty-referer">Filter empty referer</Label>
            </div>
            </div>
            <div className="input-container mb-5"> 
            <InputComponent 
            disabled={maximumClicksByIp ? false : true} 
            value={numberMaximumClicksByIp} 
            onChange={e => checkNumberInput(e.currentTarget.value) && setNumberMaximumClicksByIp(Number(e.currentTarget.value))} label="Numbers of clicks from one IP" 
            placeholder="Count" 
            className="border border-card"
            classNameContainer="max-w-full"
            classNameLabel={`${!maximumClicksByIp && 'gray-text'} text-1xl`}
            />
            <span className="error-field error-name-field">
                {errorCountClicks}
            </span>
            </div>
            </div>

            <div className="second-container container">
            <div className="input-container mb-5"> 
            <Label className="mb-3 text-1xl">Geo filter</Label>
            <div className="container-select-search mt-2">
            <MultiSelect 
            options={countries_array} 
            value={selectedCountries}
            onChange={setSelectedCountries}
            labelledBy="Countries"
            className={`${classes.rmsc_update} max-w-full`}
            valueRenderer={(selected, _options) => {
              console.log(selected)
              return selected.length
    && selected.map(({ value, label }) => label.props.children[1] + ', ')
  ;
            }}
            filterOptions={(options, filter) => filter ? options.filter(op => op.value.toLowerCase().includes(filter.toLowerCase()) || op.label.props.children[1].toLowerCase().includes(filter.toLowerCase())) : options}
            />
            </div>
            <div className="checkbox-container mb-3 mt-3 flex items-center gap-3">
            <Checkbox onCheckedChange={checked => setAllowGeoFilter(checked)} id="allow-geo-filter" />
            <Label htmlFor="allow-geo-filter">Allow geo filter</Label>
            </div>
            </div>
            <div className="input-container mb-5"> 
            <Label className="mb-3 text-1xl">Geo filter</Label>
            <div className="container-select-search mt-2 mb-2"> 
            <MultiSelect 
            options={devices_array} 
            value={selectedDevices}
            onChange={setSelectedDevices}
            labelledBy="Devices"
            className={`${classes.rmsc_update}`}
            valueRenderer={(selected, _options) => {
              console.log(selected)
              return selected.length
    && selected.map(({ value, label }) => value + ' ')
  ;
            }}
            filterOptions={(options, filter) => filter ? options.filter(op => op.value.toLowerCase().includes(filter.toLowerCase())) : options}
            />
            </div>
            <div className="checkbox-container mb-3 flex items-center gap-3">
            <Checkbox onCheckedChange={checked => setAllowDeviceFilter(checked)} id="allow-device-filter" />
            <Label htmlFor="allow-device-filter text-1xl">Allow device filter</Label>
            </div>
            </div>
            <div className="input-container mb-5"> 
            <Label className="mb-3 text-1xl">Referer filter</Label>
            <div className="container-textarea mt-2">
            <Textarea 
            value={referers} 
            onChange={e => setReferers(e.currentTarget.value)} 
            placeholder="Enter referers separated by commas" 
            className="border border-card shadow-lg"
            rows={5}
            />
            <div className="checkbox-container mb-3 mt-2 flex items-center gap-3">
            <Checkbox onCheckedChange={checked => setAllowRefererFilter(checked)} id="allow-referer-filter" />
            <Label htmlFor="allow-referer-filter">Allow referer filter</Label>
            </div>
            <Label>Fast referers</Label>
            <div className="referers-container flex flex-wrap gap-5 mt-2">
            <div className="checkbox-container flex row flex-wrap items-center justify-center gap-2">
            <Checkbox onCheckedChange={checked => setFilterEmptyReferer(checked)} id="facebook-referer" />
            <Label className="flex flex-wrap gap-1 items-center justify-center" htmlFor="facebook-referer">
             <img src={facebook.src} width={24} height={24} /> Facebook
              </Label>
              </div>
              <div className="checkbox-container flex row flex-wrap items-center justify-center gap-2">
            <Checkbox onCheckedChange={checked => setFilterEmptyReferer(checked)} id="google-referer" />
            <Label className="flex flex-wrap gap-1 items-center justify-center" htmlFor="google-referer">
            <img src={google.src} width={24} height={24} /> Google
              </Label>
              </div>
              <div className="checkbox-container flex row flex-wrap items-center justify-center gap-2">
            <Checkbox onCheckedChange={checked => setFilterEmptyReferer(checked)} id="reddit-referer" />
            <Label className="flex flex-wrap gap-1 items-center justify-center" htmlFor="reddit-referer">
            <img src={reddit.src} width={24} height={24} /> Reddit
              </Label>
              </div>
              <div className="checkbox-container flex row flex-wrap items-center justify-center gap-2">
            <Checkbox onCheckedChange={checked => setFilterEmptyReferer(checked)} id="tiktok-referer" />
            <Label className="flex flex-wrap gap-1 items-center justify-center" htmlFor="tiktok-referer">
            <img src={tiktok.src} width={24} height={24}/> Tiktok
              </Label>
              </div>
              <div className="checkbox-container flex row flex-wrap items-center justify-center gap-2">
            <Checkbox onCheckedChange={checked => setFilterEmptyReferer(checked)} id="youtube-referer" />
            <Label className="flex flex-wrap gap-1 items-center justify-center" htmlFor="youtube-referer">
            <img src={youtube.src} width={24} height={24} /> Youtube
              </Label>
              </div>
            </div>
            </div>
            </div>
            
            </div>

            </div>
            </div>

        <div className="form-pages p-3 container">
            <div className="container flex flex-wrap items-center justify-between">
            <div className="first-container container">
            <CardHeader className="p-0 pt-6">
            <CardTitle className="title-container text-2xl mb-5">Pages of campaign</CardTitle>
            </CardHeader>
            <div className="input-container mb-5 container"> 
            <InputComponent 
            className="border border-card shadow-lg" 
            classNameContainer="max-w-full" 
            value={name} 
            onChange={e => setName(e.currentTarget.value)} 
            label="Name" 
            placeholder="Name" 
            classNameLabel="text-1xl"
            />
            <div className="error-field error-name-field">
                {errorName}
            </div>
            </div>
            <div className="input-container mb-5"> 
            <InputComponent 
            className="border border-card shadow-lg" 
            classNameContainer="max-w-full" 
            value={blackPage} 
            onChange={e => setBlackPage(e.currentTarget.value)} 
            label="Black page" 
            placeholder="Black page" 
            classNameLabel="text-1xl"
            />
            <div className="error-field error-name-field">
                {errorBlackPage}
            </div>
            <div className="method-visible flex gap-2 mt-2">
            <RadioGroup onValueChange={e => setTypeLoadBlackPage(e)} className="flex flex-wrap gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem className="rounded-sm" value="show_content" id="r2" />
        <Label className="success-text" htmlFor="r2">Show content</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem className="rounded-sm" value="redirect" id="r3" />
        <Label className="destructive-text" htmlFor="r3">Redirect</Label>
      </div>
    </RadioGroup>
            </div>
            </div>
            <div className="input-container mb-5"> 
            <InputComponent 
            className="border border-card shadow-lg" 
            classNameContainer="max-w-full" 
            value={whitePage} 
            onChange={e => setWhitePage(e.currentTarget.value)} 
            label="White page" 
            disabled={typeLoadWhitePage === 'true_safe'} 
            placeholder="White page" 
            classNameLabel="text-1xl"
            />
            <div className="error-field error-name-field">
                {errorWhitePage}
            </div>
            <div className="method-visible flex gap-2 mt-2">
            <RadioGroup onValueChange={e => setTypeLoadWhitePage(e)} className="flex flex-wrap gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem className="rounded-sm" value="show_content" id="r4" />
        <Label className="success-text" htmlFor="r4">Show content</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem className="rounded-sm" value="redirect" id="r5" />
        <Label className="destructive-text" htmlFor="r5">Redirect</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem className="rounded-sm" value="true_safe" id="r6" />
        <Label className="purple-text flex items-center" htmlFor="r6">True safe <ModalInfo 
        title='Info of "True safe" option'
        description="True safe option use when you want redirect on to one from list random white pages"
        showDialogNameButton={<Info className="relative right-4 bottom-2" size={15} />}
        confirmButtonName="OK"
        onClickConfirm={() => console.log("confirm")}
        /></Label>

      </div>
    </RadioGroup>
            </div>
            </div>
            </div>
            <div className="form-status container mt-10 border-none">
            <CardHeader className="p-0">
            <CardTitle className="title-container text-2xl mb-5">Campaign status</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label className="text-1xl" htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={e => setStatus(e)}>
                          <SelectTrigger className={`border border-card ${status === '1' ? 'success' : status === '0' ? 'destructive' : ''}`} id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="border border-card">
                            <SelectItem value="0">
                             <div className="flex items-center gap-2"> 
                             🔴 Deactivated
                              </div>
                              </SelectItem>
                            <SelectItem value="1">
                           <div className="flex items-center gap-2"> 🟢 Active</div>
                              </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="actions-buttons flex flex-row-reverse md:flex-row items-center md:items-start justify-center md:justify-start gap-5">
                          <Button onClick={() => createCampaign()} className="gap-2" variant={'success'}>
                          <Check />
                            Save campaign
                          </Button>
                          <Button onClick={() => leavePage()} className="gap-2" variant={'customDestructive'}>
                          <X />
                            Discard
                          </Button>
                        </div>
                        <div className="error-field error-name-field">
                {errorStatus}
            </div>
                      </div>
                    </div>
                  </CardContent>
            </div>
            </div>
            </div>
             

        </div>
       </div>
       </div>
       </ThemeProvider>
    )
}