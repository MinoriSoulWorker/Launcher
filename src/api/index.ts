import { ApiGameFiles } from './types';

const isDevelopment = process.env.NODE_ENV !== 'production';
const api = isDevelopment ? "http://localhost:53121" : "https://minorisoulworker.github.io/launcher-api";

export const apiGetFiles = () => fetch(`${api}/gameFiles.json`, { mode: 'no-cors' })
  .then(response => response.json()) as Promise<ApiGameFiles>;
