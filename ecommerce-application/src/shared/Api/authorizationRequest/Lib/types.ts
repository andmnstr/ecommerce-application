export interface IAuthorizationData {
  email: string;
  password: string;
}

export interface ITokenCache {
  token: string;
  expirationTime: number;
}
