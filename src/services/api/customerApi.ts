import axios from "../../utils/axios"
import { ipCustomer } from "../../utils/ip"

const getCustomers = async () => {
  const res = await axios.get(ipCustomer)
  return res
}

const getCustomerId = async (id: string) => {
  const res = await axios.get(ipCustomer + `/${id}`)
  return res
}

const postCustomer = async (data: MCustomer.IRecord) => {
  const res = await axios.post(ipCustomer, data)
  return res
}

const putCustomer = async (id: string, data: MCustomer.IRecord) => {
  const res = await axios.put(ipCustomer + `/${id}`, data)
  return res
}

const delCustomer = async (id: string) => {
  const res = await axios.delete(ipCustomer + `/${id}`)
  return res
}

export {
  getCustomerId,
  getCustomers,
  postCustomer,
  putCustomer,
  delCustomer
}

