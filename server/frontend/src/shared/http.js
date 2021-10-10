import axios from "axios";
export const http = axios.create({
  baseURL: 'https://127.0.0.1:8080/api/v1/',
  timeout: 2000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
