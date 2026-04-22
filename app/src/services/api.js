import axios from 'axios';

export const apiPHP = axios.create({
  baseURL: import.meta.env.VITE_API_PHP || 'http://localhost:8001',
});

export const apiNode = axios.create({
  baseURL: import.meta.env.VITE_API_NODE || 'http://localhost:8002',
});

export function setLanguageHeader(lang) {
  const header = { 'Accept-Language': lang };
  apiPHP.defaults.headers.common  = { ...apiPHP.defaults.headers.common,  ...header };
  apiNode.defaults.headers.common = { ...apiNode.defaults.headers.common, ...header };
}