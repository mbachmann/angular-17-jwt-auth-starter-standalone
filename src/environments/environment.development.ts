import { Environment } from './environment.model';

declare var require: any;
export const environment: Environment = {
  production: false,
  version: require('../../package.json').version,
  redirectApiUrl: 'http://localhost:8080/api/test/',
  redirectSignupUrl: 'http://localhost:8080/api/auth/',
  redirectLoginUrl: 'http://localhost:8080/api/auth/',
};
