import { useEffect, useState } from "react"
import { getTechnicians, delTechnician, searchTechnicians } from "../../services/api/techniciansApi"
import TableBase, { Column } from "../../components/BaseTable"
import Button from "../../components/Button"
import BaseModal from "../../components/baseModal"
import FormTechnician from "./components/form"
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSearch, AiTwotoneCloseCircle } from "react-icons/ai"
import { Input } from "../../components/FormBase"
import { notify } from "../../components/Notification"

const Technicians = () => {
  const [dataTechnician, setDataTechnician] = useState<MTechnician.IRecord[]>([])
  const [isModal, setIsModal] = useState(false)
  const [isModalDel, setIsModalDel] = useState(false)
  const [technicianEdit, setTechnicianEdit] = useState<MTechnician.IRecord>()
  const [method, setMethod] = useState<"post" | "put">("post")
  const [isReload, setIsReload] = useState(true)
  const [technicianIdDel, setTechnicianIdDel] = useState<string>()

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

  const Columns: Column<MTechnician.IRecord>[] = [
    { title: "Mã KTV", dataIndex: "techCode" },
    { title: "Tên kỹ thuật viên", dataIndex: "name" },
    { title: "Số điện thoại", dataIndex: "phone" },
    { title: "Lương cơ bản (VNĐ)", dataIndex: "baseSalary", render: (value) => <div>{Number(value)?.toLocaleString()}</div> },
    { title: "Chức vụ", dataIndex: "position" },

    {
      title: "Thao tác",
      width: 80,
      render: (value, record, index) => (
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
          <Button onClick={() => { setTechnicianIdDel(record?.id); setIsModalDel(true) }} type="error" style={{
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

  const openModal = (record?: MTechnician.IRecord, type?: "post" | "put") => {
    setTechnicianEdit(record ?? ({} as MTechnician.IRecord))
    setMethod(type ?? "post")
    setIsModal(true)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    
    const res = await delTechnician(id)
    if (res?.success) {
      notify({ title: "Delete", type: "success", description: "Kỹ thuật viên đã được xóa." })
      setIsModalDel(false)
      setIsReload(!isReload)
    } else {
      notify({ title: "Error", type: "error", description: (res as any)?.message || "Xóa thất bại" })
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedSearchQuery(searchQuery), 500)
    return () => clearTimeout(timerId)
  }, [searchQuery])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res
        if (debouncedSearchQuery) {
          res = await searchTechnicians(debouncedSearchQuery)
        } else {
          res = await getTechnicians()
        }
        
        const payload = res.data
        if (Array.isArray(payload)) {
          setDataTechnician(payload)
        } else {
          setDataTechnician([])
        }

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu kỹ thuật viên:", error)
        setDataTechnician([])
      }
    }
    fetchData()
  }, [isReload, debouncedSearchQuery])

  return (
    <>
      <BaseModal isOpen={isModal} closeModal={() => setIsModal(false)}>
        <FormTechnician valueInitial={technicianEdit} method={method} setIsModal={setIsModal} isReload={isReload} setIsReload={setIsReload} />
      </BaseModal>

      <BaseModal isOpen={isModalDel} closeModal={() => setIsModalDel(false)}>
        <div style={{ textAlign: "center" }}>
          <AiTwotoneCloseCircle size={40} style={{ color: "red" }} />
          <h5>Are you sure?</h5>
          <p>Bạn có chắc chắn muốn xóa kỹ thuật viên này?</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Button onClick={() => setIsModalDel(false)}>Cancel</Button>
            <Button type="error" onClick={() => handleDelete(technicianIdDel)}>Confirm</Button>
          </div>
        </div>
      </BaseModal>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 10px" }}>
        <div>
          <h1 style={{ margin: 0 }}>Danh sách kỹ thuật viên</h1>
          <div>Quản lý thông tin kỹ thuật viên</div>
        </div>
        <Button onClick={() => openModal(undefined, "post")} style={{ padding: "10px 20px" }} type="gradientPrimary">
          + Thêm kỹ thuật viên
        </Button>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <AiOutlineSearch />
        <Input
          name="search"
          style={{ width: 230, margin: "10px 10px", marginRight: 25, borderRadius: 7 }}
          placeholder="Tìm theo mã, tên, SĐT..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TableBase columns={Columns} dataSource={dataTechnician} />
    </>
  )
}

export default Technicians