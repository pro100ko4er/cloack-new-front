import { CheckedState } from "@radix-ui/react-checkbox"

export interface IUser {
    id: number,
    token: string,
    expire: string,
    ban_user: boolean
}


export interface ICampaign {
    id: number,
    token: string,
    name: string,
    white_page: string,
    black_page: string,
    vpn: number,
    ipv6: number,
    maximum_clicks_by_ip: number,
    number_maximum_clicks_by_ip: number,
    geo: number,
    device: number,
    referer: number,
    geo_countries: string,
    device_devices: string,
    referer_referers: string,
    filter_empty_referer: number,
    status: number,
    last_update_at: string,
    link: string

}


export interface ICampaignBody {
    name: string,
    white_page: string,
    black_page: string,
    vpn: boolean | CheckedState,
    ipv6: boolean | CheckedState,
    maximum_clicks_by_ip: boolean | CheckedState,
    number_maximum_clicks_by_ip: number,
    geo: boolean | CheckedState,
    device: boolean | CheckedState,
    referer: boolean | CheckedState,
    geo_countries: string,
    device_devices: string,
    referer_referers: string,
    filter_empty_referer: boolean | CheckedState,
    status: boolean | CheckedState,
}

export interface ICampaignUpdateBody {
    id: number,
    name: string,
    white_page: string,
    black_page: string,
    vpn: boolean | CheckedState,
    ipv6: boolean | CheckedState,
    maximum_clicks_by_ip: boolean | CheckedState,
    number_maximum_clicks_by_ip: number,
    geo: boolean | CheckedState,
    device: boolean | CheckedState,
    referer: boolean | CheckedState,
    geo_countries: string,
    device_devices: string,
    referer_referers: string,
    filter_empty_referer: boolean | CheckedState,
    status: boolean | CheckedState,
}

export interface ICampaignUpdateFiltersBody {
    id: number,
    vpn: boolean,
    ipv6: boolean,
    maximum_clicks_by_ip: boolean,
    number_maximum_clicks_by_ip: number,
    geo: boolean,
    device: boolean,
    referer: boolean,
    geo_countries: string,
    device_devices: string,
    referer_referers: string,
    filter_empty_referer: boolean,
}

export interface ICampaignUpdatePagesBody {
    id: number,
    name: string,
    white_page: string,
    black_page: string
}

export interface ICampaignUpdateStatusBody {
    id: number,
    status: string
}

export interface IStats {
    id: number,
    token: string,
    campaign_id: number,
    ip: string,
    country: string,
    user_agent: string,
    page: string,
    referer: string,
    device: string,
    os: string,
    browser: string,
    created_at: string
}