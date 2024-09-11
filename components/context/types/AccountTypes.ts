import { BaseHttpResponse } from "."
import { IUser } from "./schemes"

export interface AccountLoginResponse extends BaseHttpResponse {
    
}

export interface GetUserResponse extends BaseHttpResponse {
    user: IUser
}

export interface GetUsersResponse extends BaseHttpResponse {
    users: IUser[]
}

export interface CreateTokenResponse extends BaseHttpResponse {

}

export interface AddUserResponse extends BaseHttpResponse {

}

export interface BanUserResponse extends BaseHttpResponse {

}

export interface UnbanUserResponse extends BaseHttpResponse {

}

export interface DeleteUserResponse extends BaseHttpResponse {

}

export interface ExtendUser extends BaseHttpResponse {

}

export interface Auth extends BaseHttpResponse {
    
}