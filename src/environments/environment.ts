import { Environment } from './environment.model';

declare var require: any;
export const environment: Environment = {
  production: true,
  version: require('../../package.json').version,
  redirectApiUrl: '_API_URL_',
  redirectLoginUrl: '_LOGIN_URL_',
  redirectSignupUrl: '_SIGNUP_URL_',
};
