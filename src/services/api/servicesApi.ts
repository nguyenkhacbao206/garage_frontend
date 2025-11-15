import axios from "../../utils/axios"
import { ipService } from "../../utils/ip"

interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  status?: number
  data?: T
}

// Lấy tất cả dịch vụ
const getServices = async (): Promise<ApiResponse<MService.IRecord[]>> => {
  const res = await axios.get(ipService)
  return res as ApiResponse<MService.IRecord[]>
}

// Lấy dịch vụ theo ID
const getServiceId = async (id: string): Promise<ApiResponse<MService.IRecord>> => {
  const res = await axios.get(`${ipService}/${id}`)
  return res as ApiResponse<MService.IRecord>
}

// Tìm kiếm dịch vụ
const searchServices = async (query: string): Promise<ApiResponse<MService.IRecord[]>> => {
  // SỬA LẠI URL CHO ĐÚNG VỚI BACKEND (dùng cả name và serviceCode)
  const res = await axios.get(`${ipService}/search?name=${query}&serviceCode=${query}`)
  return res as ApiResponse<MService.IRecord[]>
}

// Thêm dịch vụ mới
const postService = async (data: MService.IRecord): Promise<ApiResponse<MService.IRecord>> => {
  const res = await axios.post(ipService, data)
  return res as ApiResponse<MService.IRecord>
}

// Cập nhật dịch vụ
const putService = async (id: string, data: MService.IRecord): Promise<ApiResponse<MService.IRecord>> => {
  const res = await axios.put(`${ipService}/${id}`, data)
  return res as ApiResponse<MService.IRecord>
}

// Xóa dịch vụ
const delService = async (id: string): Promise<ApiResponse<null>> => {
  const res = await axios.delete(`${ipService}/${id}`)
  return res as ApiResponse<null>
}

export {
  getServices,
  getServiceId,
  searchServices,
  postService,
  putService,
  delService
}