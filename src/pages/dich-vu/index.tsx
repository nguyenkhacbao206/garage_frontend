import { useEffect, useState } from "react"
import { getServices, delService, searchServices } from "../../services/api/servicesApi"
import TableBase, { Column } from "../../components/BaseTable"
import Button from "../../components/Button"
import BaseModal from "../../components/baseModal"
import FormService from "./components/form"
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSearch, AiTwotoneCloseCircle } from "react-icons/ai"
import { Input } from "../../components/FormBase"
import { notify } from "../../components/Notification"

const convertBrokenObjectToArray = (res: any): MService.IRecord[] => {
  if (!res) return []
  
  // Nếu res.data tồn tại trả về mảng rỗng
  if (res.data) return []

  // Nếu res là đối tượng { "0": ..., "1": ... }
  const dataArray = Object.keys(res)
    .filter(key => !isNaN(Number(key)))
    .map(key => (res as any)[key]);

  return dataArray
}

const Services = () => {
  const [dataService, setDataService] = useState<MService.IRecord[]>([])
  const [isModal, setIsModal] = useState(false)
  const [isModalDel, setIsModalDel] = useState(false)
  const [serviceEdit, setServiceEdit] = useState<MService.IRecord>()
  const [method, setMethod] = useState<"post" | "put">("post")
  const [isReload, setIsReload] = useState(true)
  const [serviceIdDel, setServiceIdDel] = useState<string>()

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

  const Columns: Column<MService.IRecord>[] = [
    { title: "Mã dịch vụ", dataIndex: "serviceCode" },
    { title: "Tên dịch vụ", dataIndex: "name" },
    { title: "Giá (VNĐ)", dataIndex: "price", render: (value) => <div>{Number(value)?.toLocaleString()}</div> },
    { title: "Mô tả", dataIndex: "description" },
    {
      title: "Thao tác",
      width: 80,
      render: (value, record, index) => (
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
          <Button onClick={() => { setServiceIdDel(record?.id); setIsModalDel(true) }} type="error" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
            height: "23px",
            width: "23px",
            marginRight: 2
          }}><AiOutlineDelete /></Button>
          <Button onClick={() => openModal(record, "put")} type="primary" style={{
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

  const openModal = (record?: MService.IRecord, type?: "post" | "put") => {
    setServiceEdit(record ?? ({} as MService.IRecord))
    setMethod(type ?? "post")
    setIsModal(true)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    
    const res = await delService(id)
    if (res?.success) {
      notify({ title: "Delete", type: "error", description: "Dịch vụ đã được xóa thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    } else {
      notify({ title: "Error", type: "error", description: (res as any)?.message || "Xóa thất bại" })
    }
  }

  // Debounce search
  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedSearchQuery(searchQuery), 500)
    return () => clearTimeout(timerId)
  }, [searchQuery])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res
        if (debouncedSearchQuery) {
          res = await searchServices(debouncedSearchQuery)
        } else {
          res = await getServices()
        }

        const workingArray = convertBrokenObjectToArray(res)
        setDataService(workingArray)

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dịch vụ:", error)
        setDataService([])
      }
    }
    fetchData()
  }, [isReload, debouncedSearchQuery])

  return (
    <>
      <BaseModal isOpen={isModal} closeModal={() => setIsModal(false)}>
        <FormService valueInitial={serviceEdit} method={method} setIsModal={setIsModal} isReload={isReload} setIsReload={setIsReload} />
      </BaseModal>

      <BaseModal isOpen={isModalDel} closeModal={() => setIsModalDel(false)}>
        <div style={{ textAlign: "center" }}>
          <AiTwotoneCloseCircle size={40} style={{ color: "red" }} />
          <h5>Are you sure?</h5>
          <p>Bạn có chắc chắn muốn xóa dịch vụ này?</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Button onClick={() => setIsModalDel(false)}>Cancel</Button>
            <Button type="error" onClick={() => handleDelete(serviceIdDel)}>Confirm</Button>
          </div>
        </div>
      </BaseModal>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 10px" }}>
        <div>
          <h1 style={{ margin: 0 }}>Danh sách dịch vụ</h1>
          <div>Danh sách và thông tin dịch vụ</div>
        </div>
        <Button onClick={() => openModal(undefined, "post")} style={{ padding: "10px 20px" }} type="gradientPrimary">
          + Thêm dịch vụ
        </Button>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <AiOutlineSearch />
        <Input
          name="search"
          style={{ width: 230, margin: "10px 10px", marginRight: 25, borderRadius: 7 }}
          placeholder="Tìm theo mã, tên, ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TableBase columns={Columns} dataSource={dataService} />
    </>
  )
}

export default Services