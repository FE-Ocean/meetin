import { IUser, IUserModel } from "./user.type";

export interface IRoom {
    id: string;
    roomName: string;
    admin: string;
    createdAt: string;
    userIds: IUser[];
}

export interface IRoomModel {
    _id: string;
    room_name: string;
    admin: string;
    created_at: string;
    userIds: IUserModel[];
}

export interface IPatchRoom {
    roomName: string;
    roomId: string;
    accessToken: string;
}
