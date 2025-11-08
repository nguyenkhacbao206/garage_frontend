import axios1 from 'axios';
import { ipRoot } from './ip';

const axios = axios1.create({
  // baseURL: ipRoot,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request Interceptor
axios.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log(` ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status
    const data = error?.response?.data
    const url = error?.config?.url

    const description = data?.message || "Thằng Bảo lại code bẩn rồi"
    console.warn(`API Error [${status}] ${url}:`, description);

    switch (status) {
      case 400:
        console.log('Dữ liệu không hợp lệ (400)')
        break

      case 401:
        console.log("Vui lòng đăng nhập để tiếp tục.")
        break

      case 403:
        console.log("Không có quyền truy cập (403)")
        break

      case 404:
        console.log("Không tìm thấy (404)")
        break

      case 405:
        console.log("Phương thức không hợp lệ (405)")
        break

      case 409:
        console.log("Xung đột dữ liệu (409)")
        break

      case 500:
      case 502:
      case 503:
        console.log("Máy chủ gặp sự cố, vui lòng thử lại sau.")
        break

      default:
        console.log('Có lỗi không xác định. Vui lòng thử lại sau.')
    }

    return Promise.resolve(null);
  }
)

export default axios


