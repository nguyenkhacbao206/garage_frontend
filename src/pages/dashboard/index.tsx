import { useEffect, useState } from "react"
import BaseModal from "../../components/baseModal"
import Button from "../../components/Button"
import TableBase, { Column, ITableBase } from "../../components/BaseTable"
import Form from "../../components/FormBase";
import { getCustomers } from "../../services/api/customerApi";


const DashBoard = () => {
  const [is, setIs] = useState(false)
  const [data, setData] = useState<any>()

  const columns: Column<any>[] = [
    {
      title: "Tên",
      dataIndex: "name",
      render: (value) => (<div>{value}</div>)
    },
    {
      title: "Tuổi",
      dataIndex: "phone",
      render: (value) => (<div>{value}</div>)
    },
    {
      title: "Tuổi",
      dataIndex: "phone",
      render: (value) => (<div>{value}</div>)
    },
    {
      title: "Tuổi",
      dataIndex: "phone",
      render: (value) => (<div>{value}</div>)
    },
    {
      title: "Tuổi",
      dataIndex: "phone",
      render: (value) => (<div>{value}</div>)
    },
    {
      title: "Tuổi",
      dataIndex: "phone",
      render: (value) => (<div>{value}</div>)
    },
    {
      title: "Tuổi",
      dataIndex: "phone",
      render: (value) => (<div>{value}</div>)
    },
    {
      title: "Tuổi",
      dataIndex: "phone",
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

  useEffect(() => {
    getCustomers().then(res => { setData(res?.data) })
  }, [])

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
      <hr></hr>
      <hr></hr>
      <Form
        initialValues={{ username: "minh", password: "" }}
        onFinish={(values) => console.log("✅ Submitted:", values)}
      >

        <Form.Input name="username" placeholder="Username" />
        <Form.Input name="password" type="password" placeholder="Password" disabled />

        <Button
          htmlType="submit"
        >
          Submit
        </Button>
      </Form>
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
    </div>
  )
}

export default DashBoard