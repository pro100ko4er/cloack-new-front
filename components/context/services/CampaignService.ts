import api from '../http/index'
import { AddCampaignResponse, CampaignResponse, CampaignsForUserResponse, RemoveCampaignResponse, UpdateCampaignResponse } from '../types/CampaignTypes'
import { ICampaign, ICampaignBody, ICampaignUpdateBody } from '../types/schemes'

export default class CampaignService {


    // admin only
    static async GetCampaigns() {

    }


    static async GetCampaignsForUser(page: number = 0, limit: number = 100) {
        const result = await api.get<CampaignsForUserResponse>('/campaign/campaigns-for-user', {
            params: {
                page,
                limit
            }
        })
        return result
    }

    static async GetCampaign(id: number | string) {
        const result = await api.get<CampaignResponse>('/campaign/campaign', {
            params: {
                id
            }
        })
        return result
    }

    static async UpdateCampaign(data: ICampaignUpdateBody) {
        const result = await api.post<UpdateCampaignResponse>('/campaign/update-campaign', data)
        return result
    }

    static async UpdateCampaignPages(name: string, black_page: string, white_page: string) {
        const result = await api.post<CampaignsForUserResponse>('/campaign/update-pages-campaign', {
                name,
                black_page,
                white_page
        })
        return result
    }

    static async UpdateCampaignFilters() {
        const result = await api.post<CampaignsForUserResponse>('/campaign/update-filters-campaign', {
            
    })
    return result
    }

    static async UpdateCampaignStatus(status: string) {
        const result = await api.post<CampaignsForUserResponse>('/campaign/update-status-campaign', {
            status
    })
    return result
    }

    static async RemoveCampaign(id: number | string) {
        const result = await api.delete<RemoveCampaignResponse>('/campaign/remove-campaign', {
            data: {
                id
            },
        })
        console.log(result)
        return result
    }

    static async AddCampaign(data: ICampaignBody) {
        const result = await api.post<AddCampaignResponse>('/campaign/add-campaign', data)
        return result
    }
}