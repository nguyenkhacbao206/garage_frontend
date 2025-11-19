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

  const suppliersTest = [
    {
      id: "sup-001",
      supplierCode: "SP001",
      name: "Công ty TNHH Minh Phát",
      address: "123 Nguyễn Trãi, Q.1, TP.HCM",
      email: "contact@minhphat.vn",
      phone: "0909123456",
      description: "Chuyên cung cấp linh kiện điện tử chất lượng cao"
    },
    {
      id: "sup-002",
      supplierCode: "SP002",
      name: "Công ty Cổ phần An Khang",
      address: "45 Lê Lợi, Q.Hải Châu, Đà Nẵng",
      email: "info@ankhang.com",
      phone: "0911222333",
      description: "Nhà phân phối thiết bị văn phòng chính hãng"
    },
    {
      id: "sup-003",
      supplierCode: "SP003",
      name: "Công ty TNHH Hương Việt",
      address: "78 Trần Hưng Đạo, Q.Hoàn Kiếm, Hà Nội",
      email: "sales@huongviet.vn",
      phone: "0988777666",
      description: "Cung cấp vật tư tiêu hao y tế"
    }
  ];


  const dataOptions = suppliersTest?.map(item => ({
    label: `${item.name}(${item.supplierCode})`,
    value: item.id
  }))

  // useEffect(() => {
  //   getSupplier().then(res => setData(res.data as MSupplier.IRecord[]))
  // })


  return (
    <Select name={name} options={dataOptions} />
  )

}

export default SelectSupplier