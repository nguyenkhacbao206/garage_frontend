import { useEffect, useState } from "react";
import Select, { Option } from "../../../components/Select"
import { getCustomers } from "../../../services/api/customerApi";


const SelectCustomer = (props: {
  name: string,
  options: Option[];
  multiple?: boolean;
  placeholder?: string;
}) => {
  const { name, options, multiple, placeholder } = props
  const [data, setData] = useState<MCustomer.IRecord>()

  useEffect(() => {
    getCustomers().then(res => setData(res.data))
  }, [])

  return (
    <Select name={name} options={options} />
  )
}

export default SelectCustomer