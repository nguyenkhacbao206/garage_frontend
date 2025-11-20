import axios from "../../utils/axios"
import { ipPart } from "../../utils/ip"

interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  status?: number
  data?: T
}

const getPart = async () => {
  const res = await axios.get(ipPart)
  return res as ApiResponse<MPart.IRecord[]>
}

const getPartId = async (id: string) => {
  const res = await axios.get(`${ipPart}/${id}`)
  return res as ApiResponse<MPart.IRecord>
}

const postPart = async (data: MPart.IRecord) => {
  const res = await axios.post(ipPart, data)
  return res as ApiResponse<MPart.IRecord>
}

const putPart = async (id: string, data: MPart.IRecord) => {
  const res = await axios.put(`${ipPart}/${id}`, data)
  return res as ApiResponse<MPart.IRecord>
}

const deletePart = async (id: string) => {
  const res = await axios.delete(`${ipPart}/${id}`)
  return res as ApiResponse<null>
}

export {
  getPart,
  getPartId,
  postPart,
  putPart,
  deletePart
}