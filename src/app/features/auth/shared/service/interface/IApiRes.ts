import { Role } from "../enum/Role";

export interface IApiRes {
  data: data;
  message: string;
}

interface data {
    id: string;
    email: string;
    userName: string;
    isActive: boolean;
    token: string;
    role: Role;
}


