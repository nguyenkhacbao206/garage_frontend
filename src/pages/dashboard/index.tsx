import { useState } from "react"
import BaseModal from "../../components/baseModal"
import Button from "../../components/Button"
import TableBase, { Column, ITableBase } from "../../components/BaseTable"

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  address: string;
}

const DashBoard = () => {
  const [is, setIs] = useState(false)
  const data = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      age: 24,
      email: "vana@example.com",
      address: "Hà Nội",
    },
    {
      id: 2,
      name: "Trần Thị B",
      age: 28,
      email: "thib@example.com",
      address: "Đà Nẵng",
    },
    {
      id: 3,
      name: "Lê Văn C",
      age: 31,
      email: "vanc@example.com",
      address: "TP. Hồ Chí Minh",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      age: 26,
      email: "thid@example.com",
      address: "Cần Thơ",
    },
  ]

  const columns: Column<User>[] = [
    {
      title: "Tên",
      dataIndex: "name",
      render: (value) => (<div>{value}</div>)
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      render: (value) => (<div>{value}</div>)
    },
    {
      title: "Email & địa chỉ",
      dataIndex: "email",
      render: (value, record) => (
        <>
          <div>{value}</div>
          <div>{record.address}</div>
        </>
      )
    }
  ]

  return (
    <div>
      <BaseModal isOpen={is} closeModal={() => { setIs(false) }}>
        <div>click làm chó</div>
        <div>click làm chó</div>
        <b>bạn là con chó
        </b>
      </BaseModal>
      <Button type={"gradientPrimary"} onClick={() => { setIs(true) }}>+ click đi</Button>
      <hr />
      <TableBase
        columns={columns}
        dataSource={data}
      />
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
    </div>
  )
}

export default DashBoard