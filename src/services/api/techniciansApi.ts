import axios from "../../utils/axios"
import { ipTechnician } from "../../utils/ip" 

// Interface 
interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  status?: number
  data?: T
}

// Lấy tất cả kỹ thuật viên
const getTechnicians = async (): Promise<ApiResponse<MTechnician.IRecord[]>> => {
  const res = await axios.get(ipTechnician)
  return res as ApiResponse<MTechnician.IRecord[]>
}
// Tìm kiếm 
const searchTechnicians = async (query: string): Promise<ApiResponse<MTechnician.IRecord[]>> => {
  const res = await axios.get(`${ipTechnician}/search?keyword=${query}`)
  return res as ApiResponse<MTechnician.IRecord[]>
}

// Thêm kỹ thuật viên mới
const postTechnician = async (data: MTechnician.IRequest): Promise<ApiResponse<MTechnician.IRecord>> => {
  const res = await axios.post(ipTechnician, data)
  return res as ApiResponse<MTechnician.IRecord>
}

// Cập nhật kỹ thuật viên
const putTechnician = async (id: string, data: MTechnician.IRequest): Promise<ApiResponse<MTechnician.IRecord>> => {
  const res = await axios.put(`${ipTechnician}/${id}`, data)
  return res as ApiResponse<MTechnician.IRecord>
}

// Xóa kỹ thuật viên
const delTechnician = async (id: string): Promise<ApiResponse<null>> => {
  const res = await axios.delete(`${ipTechnician}/${id}`)
  return res as ApiResponse<null>
}

export {
  getTechnicians,
  postTechnician,
  putTechnician,
  delTechnician,
  searchTechnicians
}