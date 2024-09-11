export interface BaseHttpResponse {
    status: string,
    error?: string,
    message?: string,
    errors?: any
}