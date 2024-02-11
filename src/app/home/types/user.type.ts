import { DeliveryAddress } from "./cart.type";

export interface user {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  email: string;
  password: string;
}

export interface userLogin {
  email: string;
  password: string;
}
export interface loggedInUser {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  email: string;
}

export interface loginToken {
  token: string;
  expiresInSeconds: number;
  user: loggedInUser
}
