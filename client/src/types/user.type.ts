import { ISubscription } from "./subscription.type";

// 뷰 모델
export interface IUser {
    userId: string;
    userName: string;
    profileImg: string;
    email: string;
    notification?: ISubscription[];
}

// 서버의 응답 모델
export interface IUserModel {
    // user_id: string
    id: string;
    user_name: string;
    profile_img: string;
    email: string;
    notification?: ISubscription[];
}
