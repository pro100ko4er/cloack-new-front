import { StatsForUserCampaignResponse } from "../types/StatsTypes"
import api from '../http/index'
export default class StatsService {

    // admin only
    static async GetStats() {

    }

    static async GetStatsForUser(page: number = 0, limit: number = 100) { 
    }

    static async GetStatsForUserCampaign(campaign_id: number | string, page: number = 0, limit: number = 100) {
        const result = await api.get<StatsForUserCampaignResponse>('/stats-user/stats-for-user-and-campaign', {
            params: {
                campaign_id,
                page,
                limit
            }
        })
        return result
    }

    // admin only
    static async RemoveStats() {

    }

    
}