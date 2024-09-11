import { BaseHttpResponse } from ".";
import { IStats } from "./schemes";

export interface StatsResponse extends BaseHttpResponse {

}

export interface DeleteCustomerResponse extends BaseHttpResponse {

}

export interface StatsForUserResponse extends BaseHttpResponse {

}


export interface StatsForUserCampaignDataResponse {
    count: number,
    stats: IStats[]
}

export interface StatsForUserCampaignResponse extends BaseHttpResponse {
    stats: StatsForUserCampaignDataResponse
}