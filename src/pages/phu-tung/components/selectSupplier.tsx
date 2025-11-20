import { useEffect, useState } from "react";
import Select from "../../../components/Select"
import { getSupplier } from "../../../services/api/supplierApi";

const SelectSupplier = (props: {
  name: string,
  multiple?: boolean;
  placeholder?: string;
}) => {
  const { name, multiple, placeholder } = props
  const [data, setData] = useState<MSupplier.IRecord[]>([])


  const dataOptions = data?.map(item => ({
    label: `${item.name}(${item.supplierCode})`,
    value: item.id
  }))

  useEffect(() => {
    getSupplier().then(res => setData(res.data ? res.data : []))
  }, [])


  return (
    <Select name={name} options={dataOptions} />
  )

}

export default SelectSupplier