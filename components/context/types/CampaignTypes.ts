import { BaseHttpResponse } from ".";
import { ICampaign } from "./schemes";


export interface CampaignsForUserDataResponse {
    campaigns: ICampaign[],
    count: number
}

export interface CampaignResponse extends BaseHttpResponse {
    data: ICampaign
}

export interface CampaignsResponse extends BaseHttpResponse {
    data: ICampaign[]
}

export interface CampaignsForUserResponse extends BaseHttpResponse {
    data: CampaignsForUserDataResponse
}

export interface AddCampaignResponse extends BaseHttpResponse {
    
}

export interface RemoveCampaignResponse extends BaseHttpResponse {

}

export interface UpdateCampaignResponse extends BaseHttpResponse {

}

export interface UpdatePagesCampaignResponse extends BaseHttpResponse {

}

export interface UpdateFiltersCampaignResponse extends BaseHttpResponse {

}

export interface UpdateStatusCampaignResponse extends BaseHttpResponse {

}

export interface DownloadCodeResponse extends BaseHttpResponse {

}