// The common structure over all environment files

export interface Environment {
  production: boolean;
  version: string;
  redirectApiUrl: string;
  redirectLoginUrl: string;
  redirectSignupUrl: string;
}
