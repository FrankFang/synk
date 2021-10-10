import axios from "axios";
export const http = axios.create({
  baseURL: 'http://127.0.0.1:8080/api/v1/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});