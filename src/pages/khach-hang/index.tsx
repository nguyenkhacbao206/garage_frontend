import { useEffect, useState } from "react"
import { delCustomer, getCustomers } from "../../services/api/customerApi"
import TableBase, { Column } from "../../components/BaseTable"
import Button from "../../components/Button"
import Tag from "../../components/Tag"
import BaseModal from "../../components/baseModal"
import FormCustomer from "./components/Form"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"

const Customers = () => {
  const [dataCustomer, setDataCustomer] = useState<MCustomer.IRecord[]>([])
  const [isModal, setIsModal] = useState<boolean>(false)
  const [dataCustomerId, setDataCustomerId] = useState<MCustomer.IRecord>()
  const [method, setMethod] = useState<"post" | "put">("post")
  const [isReload, setIsReload] = useState<boolean>(true)

  const Columns: Column<MCustomer.IRecord>[] = [
    {
      title: "MÃ KH",
      dataIndex: "customerCode",
      render: (value, record, index) => (
        <div>{value}</div>
      )
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      render: (value, record, index) => (
        <div>{value}</div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      render: (value, record, index) => (
        <div>{value}</div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (value, record, index) => (
        <div>{value}</div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (value, record, index) => (
        <div>{value}</div>
      ),
    },
    {
      title: "Số xe",
      dataIndex: "cars",
      render: (value, record, index) => (
        <Tag style={{ width: 45 }}>{record.cars?.length ?? 0} xe</Tag>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      render: (value, record, index) => (
        <div style={{ minWidth: "150px" }}>{value}</div>
      ),
    },
    {
      title: "Thao tác",
      render: (value, record, index) => (
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
          <Button onClick={() => delModal(record?.id)} type="error" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
            height: "23px",
            width: "23px",
            marginRight: 2
          }}><AiOutlineDelete /></Button>
          <Button onClick={() => setModal(record, "put")} type="primary" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
            height: "23px",
            width: "23px"
          }}><AiOutlineEdit /></Button>
        </div>
      ),
    },
  ]

  const delModal = async (id: any) => {
    await delCustomer(id)
    setIsReload(!isReload)
  }
  const setModal = (data?: MCustomer.IRecord, method?: "post" | "put") => {
    setDataCustomerId(data || {})
    setMethod(method || "post")
    setIsModal(true)
  }

  useEffect(() => {
    getCustomers().then(res => setDataCustomer(res?.data))
  }, [isReload])

  return (
    <>
      <BaseModal
        isOpen={isModal}
        closeModal={() => setIsModal(false)}
      >
        <FormCustomer isReload={isReload} setIsReload={setIsReload} valueInitial={dataCustomerId} method={method} setIsModal={setIsModal} />
      </BaseModal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 10px"
        }}
      >
        <div>
          <h1 style={{
            margin: "0"
          }}>Danh sách khách hàng</h1>
          <div>Danh sách và thông tin khách hàng</div>
        </div>
        <div>
          <Button onClick={() => setModal(undefined, 'post')} style={{ padding: "10px 20px" }} type="gradientPrimary">+ Thêm khách hàng</Button>
        </div>
      </div>
      <TableBase
        columns={Columns}
        dataSource={dataCustomer}
      />
    </>
  )
}

export default Customers